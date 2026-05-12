# members/models.py

from django.db import models

from django.db import models

class Member(models.Model):
    GENDER_CHOICES = [('male', 'Male'), ('female', 'Female'), ('other', 'Other')]
    BLOOD_GROUP_CHOICES = [('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'), ('AB+', 'AB+'), ('AB-', 'AB-'), ('O+', 'O+'), ('O-', 'O-')]
    MEMBER_TYPE_CHOICES = [
    ('donor', 'দাতা সদস্য'),
    ('lifetime', 'আজীবন সদস্য'),
    ('general', 'সাধারণ সদস্য'),
    ('library', 'লাইব্রেরি সদস্য'),
]

    name = models.CharField(max_length=200)
    member_code = models.CharField(max_length=100, unique=True, blank=True, default="")
    members_number = models.CharField(max_length=200, blank=True, null=True)
    si_no = models.CharField(max_length=50, unique=True)
    member_type = models.CharField(max_length=20, choices=MEMBER_TYPE_CHOICES)
    include_date = models.DateField(blank=True, null=True)

    father_name = models.CharField(max_length=200, blank=True, null=True)
    mother_name = models.CharField(max_length=200, blank=True, null=True)

    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    religion = models.CharField(max_length=100, blank=True, null=True)

    birth_certificate_no = models.CharField(max_length=100, blank=True, null=True)
    nid_no = models.CharField(max_length=100, blank=True, null=True)
    nationality = models.CharField(max_length=100, default="Bangladeshi")
    passport_no = models.CharField(max_length=100, blank=True, null=True)

    primary_mobile_number = models.CharField(max_length=20, blank=True, null=True)
    secondary_mobile_number = models.CharField(max_length=20, blank=True, null=True)
    guardian_mobile_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    present_address = models.CharField(max_length=255, blank=True, null=True)
    present_area = models.CharField(max_length=255, blank=True, null=True)
    present_thana = models.CharField(max_length=150, blank=True, null=True)
    present_district = models.CharField(max_length=150, blank=True, null=True)

    permanent_address = models.CharField(max_length=255, blank=True, null=True)
    permanent_area = models.CharField(max_length=255, blank=True, null=True)
    permanent_thana = models.CharField(max_length=150, blank=True, null=True)
    permanent_district = models.CharField(max_length=150, blank=True, null=True)

    photo = models.ImageField(upload_to='members/photos/', blank=True, null=True)
    

    form_no = models.CharField(max_length=100, blank=True, null=True)

    admission = models.CharField(max_length=200, blank=True, null=True)
    collateral = models.CharField(max_length=200, blank=True, null=True)
    donation = models.CharField(max_length=200, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    death_date = models.DateField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['si_no']
        verbose_name = "Member"
        verbose_name_plural = "Members"

    def __str__(self):
        return f"{self.name} ({self.member_code})"

    @property
    def full_mobile(self):
        return self.primary_mobile_number or self.secondary_mobile_number or self.guardian_mobile_number

    @property
    def member_status(self):
        return "Active" if self.is_active else "Inactive"
    
    
class VoterList(models.Model):
    year = models.CharField(max_length=20)  # e.g. ২০২২-২৩

    donor_pdf = models.FileField(upload_to='voters/')
    life_pdf = models.FileField(upload_to='voters/')
    general_pdf = models.FileField(upload_to='voters/')

    def __str__(self):
        return f"Voter List {self.year}"