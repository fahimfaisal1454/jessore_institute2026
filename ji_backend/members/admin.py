from django.contrib import admin
from django.utils.html import mark_safe
from .models import Member, VoterList


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'member_code',
        'name',
        'member_type',
        'include_date',
        'primary_mobile_number',
        'is_active',
        'created_at',
    )

    list_filter = (
        'member_type',
        'include_date',
        'is_active',
        'gender',
        'blood_group',
    )

    search_fields = (
        'name',
        'member_code',
        'si_no',
        'primary_mobile_number',
        'secondary_mobile_number',
        'guardian_mobile_number',
        'nid_no',
    )

    ordering = ('si_no',)


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