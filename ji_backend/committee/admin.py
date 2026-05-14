from django.contrib import admin
from django.utils.html import format_html
from .models import (
    CommitteeMember,
    OldCommitteeDocument,
    SubCommitteeCategory,
    SubCommitteeMember,
    SubCommitteeDocument,
    ExecutiveCommittee, Committee,Employee
)

@admin.register(ExecutiveCommittee)
class ExecutiveCommitteeAdmin(admin.ModelAdmin):
    list_display = ('position', 'name')
# 🔥 MAIN COMMITTEE
@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):
    list_display = (
        "title",
    )

    search_fields = (
        "title",
    )


@admin.register(CommitteeMember)
class CommitteeMemberAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "committee",
        "committee_role",
        "member_name",
        "member_number",
    )

    ordering = ("order",)

    search_fields = (
        "committee__title",
        "committee_role",
        "member_name",
        "member_number",
    )

    list_filter = (
        "committee",
    )


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
    # ✅ Updated for new model fields
    list_display = [
        'member_name',
        'category',
        'member_role',
        'member_number',
        'order',
        'preview'
    ]

    list_filter = [
        'category',
    ]

    search_fields = [
        'member_name',
        'member_role',
        'member_number'
    ]

    ordering = [
        'category',
        'order'
    ]

    list_display_links = [
        'member_name'
    ]

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
    
    
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "serial",
        "name",
        "position",
        "department",
        "salary",
    )

    list_filter = (
        "department",
    )

    search_fields = (
        "name",
        "position",
    )

    ordering = (
        "department",
        "serial",
    )