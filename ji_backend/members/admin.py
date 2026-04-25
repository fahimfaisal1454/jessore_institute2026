from django.contrib import admin
from .models import Member, VoterList


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):

    # 🔹 List view (table in admin)
    list_display = (
        'id',
        'member_no',
        'member_type',
        'date',
        'mobile',
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
            'fields': ('image',)
        }),
    )

    # 🔹 Optional: show image preview
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="80" height="80" />'
        return "No Image"

    image_preview.allow_tags = True
    image_preview.short_description = 'Preview'
    
@admin.register(VoterList)
class VoterListAdmin(admin.ModelAdmin):
    list_display = ('id', 'year')