import os
import re
from pathlib import Path
from datetime import datetime

# =========================
# CONFIGURATION
# =========================
EXCLUDE_DIRS = {
    "node_modules",
    "venv",
    ".venv",
    "__pycache__",
    ".git",
    ".github",
    ".idea",
    ".vscode",
    "dist",
    "build",
    ".next",
    ".cache",
    ".pytest_cache",
    ".mypy_cache",
    ".ruff_cache",
    "coverage",
    ".turbo"
}

EXCLUDE_FILES = {
    "project_export.txt",
    "project_structure.txt",
    "project_code.txt",
    "export_project.py",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".DS_Store",
    ".env",
    ".env.local",
    ".env.production",
    ".coverage"
}

# Binary files: include in tree + metadata, skip raw content
BINARY_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
    ".mp4", ".mp3", ".wav",
    ".zip", ".rar", ".7z",
    ".exe", ".dll",
    ".sqlite3", ".db",
    ".pyc", ".pyo",
    ".pdf", ".docx", ".xlsx",
    ".ico",
    ".ttf", ".woff", ".woff2"
}

OUTPUT_FILE = "project_export.txt"
BASE_DIR = Path(".").resolve()
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

total_files_exported = 0
total_dirs = 0
total_files = 0
binary_files_indexed = 0


# =========================
# HELPERS
# =========================
def normalize_path(path: Path):
    return str(path).replace("\\", "/")


def should_skip(path: Path):
    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True

    if path.name in EXCLUDE_FILES:
        return True

    # Skip minified bundles
    if path.name.endswith(".min.js") or path.name.endswith(".min.css"):
        return True

    try:
        if path.is_file():
            if path.stat().st_size == 0:
                return True
            if path.stat().st_size > MAX_FILE_SIZE:
                return True
    except Exception:
        return True

    return False


def is_binary_file(path: Path):
    return path.suffix.lower() in BINARY_EXTENSIONS


def is_text_file(file_path):
    if is_binary_file(file_path):
        return False

    try:
        with open(file_path, "rb") as f:
            chunk = f.read(4096)
            return b"\x00" not in chunk
    except Exception:
        return False


def mask_secrets(content):
    patterns = [
        r'(?i)(SECRET_KEY\s*=\s*)([^\n]+)',
        r'(?i)(API_KEY\s*=\s*)([^\n]+)',
        r'(?i)(TOKEN\s*=\s*)([^\n]+)',
        r'(?i)(PASSWORD\s*=\s*)([^\n]+)',
        r'(?i)(ACCESS_KEY\s*=\s*)([^\n]+)',
        r'(?i)(JWT_SECRET\s*=\s*)([^\n]+)',
        r'(?i)(DATABASE_URL\s*=\s*)([^\n]+)',
        r'(?i)(EMAIL_HOST_PASSWORD\s*=\s*)([^\n]+)',
        r'(?i)(STRIPE_SECRET\s*=\s*)([^\n]+)',
    ]

    for pattern in patterns:
        content = re.sub(pattern, r'\1***MASKED***', content)

    return content


def safe_read(file_path):
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as infile:
            content = infile.read()
            content = mask_secrets(content)
            return content.encode("utf-8", errors="ignore").decode("utf-8")
    except Exception as e:
        return f"[ERROR READING FILE: {str(e)}]"


def get_code_fence(file_path):
    extension_map = {
        ".py": "python",
        ".js": "javascript",
        ".jsx": "jsx",
        ".ts": "typescript",
        ".tsx": "tsx",
        ".html": "html",
        ".css": "css",
        ".json": "json",
        ".md": "markdown",
        ".txt": "text",
        ".yml": "yaml",
        ".yaml": "yaml",
        ".sh": "bash"
    }
    return extension_map.get(file_path.suffix.lower(), "")


def write_tree(directory, outfile, prefix=""):
    global total_dirs, total_files

    entries = sorted(
        [e for e in directory.iterdir() if not should_skip(e)],
        key=lambda x: (x.is_file(), x.name.lower())
    )

    for index, entry in enumerate(entries):
        connector = "└── " if index == len(entries) - 1 else "├── "

        outfile.write(f"{prefix}{connector}{entry.name}\n")

        if entry.is_dir():
            total_dirs += 1
            extension = "    " if index == len(entries) - 1 else "│   "
            write_tree(entry, outfile, prefix + extension)
        else:
            total_files += 1


# =========================
# EXPORTER
# =========================
with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:

    # HEADER
    outfile.write("PROJECT EXPORT\n")
    outfile.write("=" * 100 + "\n")
    outfile.write(f"Root Directory: {BASE_DIR.name}\n")
    outfile.write(f"Generated: {datetime.now()}\n")
    outfile.write("=" * 100 + "\n\n")

    # PROJECT STRUCTURE
    outfile.write("PROJECT STRUCTURE\n")
    outfile.write("=" * 100 + "\n")
    outfile.write(f"{BASE_DIR.name}/\n")
    write_tree(BASE_DIR, outfile)

    # BINARY FILE INDEX
    outfile.write("\n\nBINARY / ASSET FILE INDEX\n")
    outfile.write("=" * 100 + "\n")

    for root, dirs, files in os.walk(BASE_DIR):
        root_path = Path(root)

        dirs[:] = sorted([
            d for d in dirs
            if d not in EXCLUDE_DIRS
        ])

        for file in sorted(files):
            file_path = root_path / file

            if should_skip(file_path):
                continue

            if is_binary_file(file_path):
                binary_files_indexed += 1
                relative_path = normalize_path(file_path.relative_to(BASE_DIR))

                outfile.write(
                    f"{relative_path} | Type: {file_path.suffix.lower()}\n"
                )

    # FILE CONTENTS
    outfile.write("\n\nFILE CONTENTS\n")
    outfile.write("=" * 100 + "\n")

    for root, dirs, files in os.walk(BASE_DIR):
        root_path = Path(root)

        dirs[:] = sorted([
            d for d in dirs
            if d not in EXCLUDE_DIRS
        ])

        for file in sorted(files):
            file_path = root_path / file

            if should_skip(file_path):
                continue

            if not is_text_file(file_path):
                continue

            relative_path = normalize_path(file_path.relative_to(BASE_DIR))
            content = safe_read(file_path)

            line_count = content.count("\n") + 1
            total_files_exported += 1

            lang = get_code_fence(file_path)

            outfile.write("\n" + "=" * 100 + "\n")
            outfile.write(f"FILE: {relative_path} ({line_count} lines)\n")
            outfile.write("=" * 100 + "\n")

            outfile.write(f"```{lang}\n")
            outfile.write(content)
            outfile.write("\n```\n")

    # SUMMARY
    outfile.write("\n\nEXPORT SUMMARY\n")
    outfile.write("=" * 100 + "\n")
    outfile.write(f"Total Directories: {total_dirs}\n")
    outfile.write(f"Total Files Indexed: {total_files}\n")
    outfile.write(f"Binary/Asset Files Indexed: {binary_files_indexed}\n")
    outfile.write(f"Total Text Files Exported: {total_files_exported}\n")

print(f"Export complete: {OUTPUT_FILE}")