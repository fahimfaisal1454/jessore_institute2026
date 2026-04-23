from django.db import models

class AboutUs(models.Model):
    PAGE_CHOICES = [
        ('history', 'History / পরিচিতি'),
        ('mission', 'Mission / লক্ষ্য'),
    ]

    page_type = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return self.title
