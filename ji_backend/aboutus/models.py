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


class Person(models.Model):
    title = models.CharField(max_length=255)   # যদুনাথ মজুমদার
    content = models.TextField()               # full description

    def __str__(self):
        return self.title
    
    
# aboutus/models.py

from django.db import models


class Photo(models.Model):
    image = models.ImageField(upload_to='gallery/photos/')
    order = models.PositiveIntegerField(default=0)
    category = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Photo {self.id}"

    class Meta:
        ordering = ['order']


class Video(models.Model):
    title = models.CharField(max_length=255, blank=True)
    url = models.URLField()  # YouTube embed link
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title or self.url

    class Meta:
        ordering = ['order']
        
        
class ApplicationForm(models.Model):
    TYPE_CHOICES = [
        ('field', 'Field Application'),
        ('leave', 'Leave Application'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES, unique=True)
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='forms/')

    def __str__(self):
        return self.title
    
    
    
class InfoPage(models.Model):
    PAGE_CHOICES = [
        ('open_liberty_stage', 'Open Liberty Stage'),
        ('primary_school', 'Primary School'),
    ]

    page_type = models.CharField(
        max_length=50,
        choices=PAGE_CHOICES,
        unique=True
    )
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return f"{self.get_page_type_display()}"
    
class AnnualReport(models.Model):
    title = models.CharField(max_length=255)
    publish_date = models.DateField()
    file = models.FileField(upload_to='annual_reports/')

    def __str__(self):
        return self.title
    
    
# models.py

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name