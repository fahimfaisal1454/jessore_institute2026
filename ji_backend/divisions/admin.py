from django.contrib import admin
from .models import Division

@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ('category', 'title')