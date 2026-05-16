from django.contrib import admin
from .models import BookCategory, BookMaster


# =========================
# BOOK CATEGORY ADMIN
# =========================
@admin.register(BookCategory)
class BookCategoryAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'category_code',
        'category_name',
        'category_name_bangla',
        'parent_category',
        'is_active',
        'created_at',
    ]

    search_fields = [
        'category_code',
        'category_name',
        'category_name_bangla',
    ]

    list_filter = [
        'is_active',
        'parent_category',
    ]

    ordering = ['category_code']


# =========================
# BOOK MASTER ADMIN
# =========================
@admin.register(BookMaster)
class BookMasterAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'version',
        'serial_no',
        'copy_no',
        'book_code',
        'book_name',
        'author_name',
        'book_category',
        'source',
        'is_active',
        'created_at',
    ]

    search_fields = [
        'serial_no',
        'book_name',
        'book_code',
        'author_name',
        'editor_name',
        'translator_name',
        'isbn_number',
        'bar_code',
        'call_no',
    ]

    list_filter = [
        'version',
        'source',
        'book_category',
        'is_active',
        'is_deleted',
    ]

    ordering = [
        'version',
        'serial_no',
    ]

    readonly_fields = [
        'created_at',
        'updated_at',
    ]