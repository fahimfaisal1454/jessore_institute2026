from django.contrib import admin
from .models import OldCommitteeCategory, OldCommitteeMember


@admin.register(OldCommitteeCategory)
class OldCommitteeCategoryAdmin(admin.ModelAdmin):
    list_display = ['type']
    search_fields = ['type']


@admin.register(OldCommitteeMember)
class OldCommitteeMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'year']
    list_filter = ['category']
    search_fields = ['name']
    list_select_related = ['category']  # ✅ performance boost
    ordering = ['category__type', 'name']  # ✅ better grouping + sorting