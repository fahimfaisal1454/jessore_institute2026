from django.contrib import admin
from django.utils.html import format_html
from .models import (
    CommitteeMember,
    OldCommitteeDocument,
    SubCommitteeCategory,
    SubCommitteeMember,
    SubCommitteeDocument
)


# 🔥 MAIN COMMITTEE
@admin.register(CommitteeMember)
class CommitteeMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'role_type', 'order']
    list_filter = ['role_type']
    search_fields = ['name', 'role']
    ordering = ['order']


# 🔥 OLD MAIN COMMITTEE (PDF)
@admin.register(OldCommitteeDocument)
class OldCommitteeDocumentAdmin(admin.ModelAdmin):
    list_display = ['year', 'order']
    search_fields = ['year']
    ordering = ['order']


# 🔥 SUB COMMITTEE CATEGORY
@admin.register(SubCommitteeCategory)
class SubCommitteeCategoryAdmin(admin.ModelAdmin):
    list_display = ['type']
    search_fields = ['type']


# 🔥 SUB COMMITTEE MEMBERS (IMAGE)
@admin.register(SubCommitteeMember)
class SubCommitteeMemberAdmin(admin.ModelAdmin):
    # ✅ FIXED: Added category + role to remove empty space
    list_display = ['name', 'category', 'role', 'role_type', 'order', 'preview']

    list_filter = ['category', 'role_type']
    search_fields = ['name', 'role']
    ordering = ['category', 'order']

    list_display_links = ['name']

    # 🔥 Image preview
    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="45" height="55" style="object-fit:cover;border-radius:4px;" />',
                obj.image.url
            )
        return "No Image"

    preview.short_description = "Image"


# 🔥 SUB COMMITTEE DOCUMENTS (PDF)
@admin.register(SubCommitteeDocument)
class SubCommitteeDocumentAdmin(admin.ModelAdmin):
    list_display = ['category', 'year', 'order']
    list_filter = ['category']
    search_fields = ['year']
    ordering = ['category', 'order']