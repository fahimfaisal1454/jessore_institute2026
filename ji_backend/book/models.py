from django.db import models


class BookCategory(models.Model):
    category_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    category_name = models.CharField(max_length=300)
    category_name_bangla = models.CharField(max_length=300, blank=True, null=True)

    parent_category = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subcategories'
    )

    remarks = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category_code']
        verbose_name = "Book Category"
        verbose_name_plural = "Book Categories"
        indexes = [
            models.Index(fields=['category_code']),
            models.Index(fields=['category_name']),
            models.Index(fields=['category_name_bangla']),
        ]

    def __str__(self):
        return f"{self.category_code} - {self.category_name}"
    
    
    

class BookMaster(models.Model):
    VERSION_CHOICES = (
        ('Bangla', 'Bangla'),
        ('English', 'English'),
    )

    SOURCE_CHOICES = (
        ('ক্রয়', 'ক্রয়'),
        ('উপহার', 'উপহার'),
    )

    version = models.CharField(max_length=20, choices=VERSION_CHOICES)
    serial_no = models.PositiveIntegerField()
    book_code = models.CharField(max_length=50, unique=True)
    book_addition_number = models.CharField(max_length=100)
    book_addition_date = models.DateField()
    book_name = models.CharField(max_length=500)
    author_name = models.CharField(max_length=300, blank=True, null=True)
    editor_name = models.CharField(max_length=300, blank=True, null=True)
    translator_name = models.CharField(max_length=300, blank=True, null=True)

    book_category = models.ForeignKey(
        BookCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    call_no = models.CharField(max_length=100)
    isbn_number = models.CharField(max_length=100, blank=True, null=True)
    copy_no = models.CharField(max_length=100, blank=True, null=True)

    publisher_name = models.CharField(max_length=300, blank=True, null=True)
    place_of_publication = models.CharField(max_length=300, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    book_page_no = models.PositiveIntegerField(blank=True, null=True)

    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)

    place = models.CharField(max_length=200, blank=True, null=True)
    floor_no = models.CharField(max_length=50, blank=True, null=True)
    cupboard = models.CharField(max_length=50, blank=True, null=True)
    rack_no = models.CharField(max_length=50, blank=True, null=True)

    bar_code = models.CharField(max_length=150, unique=True)

    remarks = models.TextField(blank=True, null=True)

    # Production-level safety
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['version', 'serial_no']
        unique_together = ('version', 'serial_no')
        verbose_name = "Book Master"
        verbose_name_plural = "Book Master"
        indexes = [
            models.Index(fields=['version', 'serial_no']),
            models.Index(fields=['book_code']),
            models.Index(fields=['bar_code']),
            models.Index(fields=['book_name']),
            models.Index(fields=['author_name']),
            models.Index(fields=['isbn_number']),
            models.Index(fields=['call_no']),
        ]

    def __str__(self):
        return f"{self.version} - {self.serial_no} - {self.book_name}"