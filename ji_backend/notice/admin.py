# notice/admin.py

from django.contrib import admin
from .models import Notice


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'date']
    list_filter = ['type', 'date']
    search_fields = ['title']
    ordering = ['-date']