from django.contrib import admin
from django.utils.html import mark_safe
from .models import Member, VoterList


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):

    # 🔹 Clean short name (for TextField)
    def short_name(self, obj):
        if obj.name:
            return obj.name.replace('\n', ' ')[:50] + "..."
        return "-"
    short_name.short_description = "Name"

    # 🔹 Image preview (modern Django way)
    def image_preview(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" width="80" height="80" '
                f'style="object-fit:cover;border:1px solid #ccc;" />'
            )
        return "No Image"
    image_preview.short_description = "Preview"

    # 🔹 Table view
    list_display = (
        'id',
        'member_no',
        'short_name',     # ✅ fixed name display
        'member_type',
        'date',
        'mobile',
        'image_preview',  # ✅ show image in list
    )

    # 🔹 Filters (right sidebar)
    list_filter = (
        'member_type',
        'date',
    )

    # 🔹 Search
    search_fields = (
        'member_no',
        'name',
        'mobile',
    )

    # 🔹 Ordering
    ordering = ('-id',)

    # 🔹 Form layout
    fieldsets = (
        ('Basic Info', {
            'fields': ('member_no', 'member_type')
        }),
        ('Details', {
            'fields': ('name', 'date', 'mobile')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
    )

    # 🔹 Readonly fields
    readonly_fields = ('image_preview',)


# 🔥 VOTER LIST ADMIN
@admin.register(VoterList)
class VoterListAdmin(admin.ModelAdmin):

    # 🔹 PDF links
    def donor_link(self, obj):
        if obj.donor_pdf:
            return mark_safe(f'<a href="{obj.donor_pdf.url}" target="_blank">View</a>')
        return "-"
    donor_link.short_description = "Donor PDF"

    def life_link(self, obj):
        if obj.life_pdf:
            return mark_safe(f'<a href="{obj.life_pdf.url}" target="_blank">View</a>')
        return "-"
    life_link.short_description = "Life PDF"

    def general_link(self, obj):
        if obj.general_pdf:
            return mark_safe(f'<a href="{obj.general_pdf.url}" target="_blank">View</a>')
        return "-"
    general_link.short_description = "General PDF"

    # 🔹 Table
    list_display = (
        'id',
        'year',
        'donor_link',
        'life_link',
        'general_link',
    )

    ordering = ('-id',)