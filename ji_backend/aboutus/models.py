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