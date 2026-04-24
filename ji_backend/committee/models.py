from django.db import models


class CommitteeMember(models.Model):
    ROLE_TYPE = [
        ('head', 'Head'),
        ('member', 'Member'),
    ]

    name = models.CharField(max_length=200)
    role = models.CharField(max_length=255)
    image = models.ImageField(upload_to='committee/', blank=True, null=True)

    role_type = models.CharField(max_length=10, choices=ROLE_TYPE)

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.role_type})"

    class Meta:
        ordering = ['order']
        
        
class OldCommitteeDocument(models.Model):
    year = models.CharField(max_length=20)
    file = models.FileField(upload_to='committee_pdfs/')

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.year

    class Meta:
        ordering = ['order']
        
        
class SubCommitteeCategory(models.Model):
    TYPE_CHOICES = [
        ('library', 'লাইব্রেরি বিভাগ'),
        ('sports', 'ক্রীড়া বিভাগ'),
        ('drama', 'নাট্যকলা সংসদ'),
        ('town', 'টাউন ক্লাব'),
        ('issue', 'ইস্যু বিভাগ'),
    ]

    type = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)

    def __str__(self):
        return dict(self.TYPE_CHOICES).get(self.type)


# 🔥 CURRENT (IMAGE MEMBERS)
class SubCommitteeMember(models.Model):
    ROLE_TYPE = [
        ('head', 'Head'),
        ('member', 'Member'),
    ]

    category = models.ForeignKey(
        SubCommitteeCategory,
        on_delete=models.CASCADE,
        related_name='members'
    )

    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    image = models.ImageField(upload_to='subcommittee/')

    role_type = models.CharField(max_length=10, choices=ROLE_TYPE)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']


# 🔥 OLD (PDF)
class SubCommitteeDocument(models.Model):
    category = models.ForeignKey(
        SubCommitteeCategory,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    year = models.CharField(max_length=20)
    file = models.FileField(upload_to='subcommittee_pdfs/')
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.category} - {self.year}"

    class Meta:
        ordering = ['order']