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

    # NEW FIELD
    details = models.TextField(
        blank=True,
        null=True,
        help_text="Small details/designation under the name"
    )

    image = models.ImageField(
        upload_to='committee/',
        blank=True,
        null=True
    )

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
        
        
# =========================
# SUB COMMITTEE TITLE
# =========================
class SubCommittee(models.Model):
    title = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.title


# =========================
# SUB COMMITTEE CATEGORY
# Example:
# Library / Sports / Drama / Town Club
# =========================
class SubCommitteeCategory(models.Model):
    subcommittee = models.ForeignKey(
    SubCommittee,
    on_delete=models.CASCADE,
    related_name="categories",
    null=True,
    blank=True
)

    TYPE_CHOICES = [
        ('library', 'লাইব্রেরি বিভাগ'),
        ('sports', 'ক্রীড়া বিভাগ'),
        ('drama', 'নাট্যকলা সংসদ'),
        ('town', 'টাউন ক্লাব'),
        ('issue', 'ইস্যু বিভাগ'),
    ]

    type = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES
    )

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.subcommittee.title} - {self.get_type_display()}"

    class Meta:
        ordering = ['order']


# =========================
# SUB COMMITTEE MEMBERS
# =========================
class SubCommitteeMember(models.Model):
    category = models.ForeignKey(
    SubCommitteeCategory,
    on_delete=models.CASCADE,
    related_name="members",
    null=True,
    blank=True
)

    member_role = models.CharField(
    max_length=255,
    blank=True,
    null=True,
    default=""
)

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
        upload_to='subcommittee/',
        blank=True,
        null=True
    )

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.member_name

    class Meta:
        ordering = ['order']


# =========================
# OLD SUB COMMITTEE DOCUMENTS
# =========================
class SubCommitteeDocument(models.Model):
    category = models.ForeignKey(
        SubCommitteeCategory,
        on_delete=models.CASCADE,
        related_name='documents'
    )

    year = models.CharField(max_length=20)

    file = models.FileField(
        upload_to='subcommittee_pdfs/'
    )

    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.category.get_type_display()} - {self.year}"

    class Meta:
        ordering = ['order']
        
        
        
class Employee(models.Model):
    DEPARTMENT_CHOICES = [
        ('general', 'সাধারণ বিভাগ'),
        ('library', 'লাইব্রেরি বিভাগ'),
        ('sports', 'ক্রীড়া সংসদ'),
        ('drama', 'নাট্যকলা সংসদ'),
    ]

    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    serial = models.PositiveIntegerField()
    salary = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='employees/', blank=True, null=True)

    def __str__(self):
        return self.name