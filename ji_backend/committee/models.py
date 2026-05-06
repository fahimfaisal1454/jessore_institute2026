from django.db import models


class ExecutiveCommittee(models.Model):

    POSITION_CHOICES = [
        ('president', 'সভাপতি'),
        ('secretary', 'সাধারণ সম্পাদক'),
    ]

    position = models.CharField(
        max_length=20,
        choices=POSITION_CHOICES,
        unique=True
    )
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='committee/', blank=True, null=True)

    def __str__(self):
        return self.get_position_display()

class Committee(models.Model):
    title = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class CommitteeMember(models.Model):
    committee = models.ForeignKey(
        Committee,
        on_delete=models.CASCADE,
        related_name="members",
        null=True,   # temporary for existing data migration
        blank=True
    )

    committee_role = models.CharField(max_length=255)

    member_name = models.CharField(
        max_length=255,
        default=""
    )

    member_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    image = models.ImageField(
        upload_to='committee/',
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.member_name

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