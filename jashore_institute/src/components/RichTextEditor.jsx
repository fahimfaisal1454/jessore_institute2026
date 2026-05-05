import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded bg-white">
      
      {/* 🔥 TOOLBAR */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">

        {/* Bold */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        {/* Italic */}
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        {/* Heading */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        {/* List */}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        {/* Align */}
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          Left
        </button>

        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          Center
        </button>

        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          Right
        </button>

      </div>

      {/* 🔥 EDITOR */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] outline-none"
      />
    </div>
  );
}