# members/models.py

from django.db import models

class Member(models.Model):

    MEMBER_TYPE_CHOICES = [
        ('donor', 'দাতা সদস্য'),
        ('lifetime', 'আজীবন সদস্য'),
        ('general', 'সাধারণ সদস্য'),
        ('library', 'লাইব্রেরি সদস্য'),
        ('sports', 'ক্রীড়া সদস্য'),
        ('drama', 'নাট্যকলা সদস্য'),
        ('town', 'টাউন ক্লাব সদস্য'),
        ('child', 'শিশু চিত্রবিনোদন কেন্দ্র সদস্য'),
    ]

    member_no = models.CharField(max_length=50)
    name = models.TextField()  # multiline text (name + address)
    date = models.DateField()
    member_type = models.CharField(max_length=20, choices=MEMBER_TYPE_CHOICES)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    image = models.ImageField(upload_to='members/', blank=True, null=True)

    def __str__(self):
        return f"{self.member_no} - {self.member_type}"
    
    
class VoterList(models.Model):
    year = models.CharField(max_length=20)  # e.g. ২০২২-২৩

    donor_pdf = models.FileField(upload_to='voters/')
    life_pdf = models.FileField(upload_to='voters/')
    general_pdf = models.FileField(upload_to='voters/')

    def __str__(self):
        return f"Voter List {self.year}"