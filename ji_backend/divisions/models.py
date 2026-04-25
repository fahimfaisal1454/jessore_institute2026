from django.db import models

class Division(models.Model):

    DIVISION_CHOICES = [
        ('library', 'লাইব্রেরি বিভাগ'),
        ('sports', 'ক্রীড়া বিভাগ'),
        ('drama', 'নাট্যকলা সংসদ'),
        ('town', 'টাউন ক্লাব'),
        ('child', 'শিশু চিত্ত বিনোদন কেন্দ্র'),
    ]

    category = models.CharField(
        max_length=20,
        choices=DIVISION_CHOICES,
        unique=True   # 🔥 important: one content per division
    )

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField() 
    image = models.ImageField(upload_to='divisions/', blank=True, null=True)

    def __str__(self):
        return dict(self.DIVISION_CHOICES).get(self.category, self.category)