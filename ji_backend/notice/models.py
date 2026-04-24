# notice/models.py

from django.db import models


class Notice(models.Model):
    TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('image', 'Image'),
        ('text', 'Text'),
    ]

    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    file = models.FileField(upload_to='notices/', blank=True, null=True)
    content = models.TextField(blank=True, null=True)

    date = models.DateField()  # ✅ admin controls date
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date']  # 🔥 latest first