from django.db import models

class OldCommitteeCategory(models.Model):
    TYPE_CHOICES = [
        ('president', 'সভাপতি গণের তালিকা'),
        ('secretary', 'সাধারণ সম্পাদক তালিকা'),
        ('drama', 'সম্পাদক, নাট্যকলা সংসদ'),
        ('sports', 'সম্পাদক, ক্রীড়া সংসদ'),
        ('library', 'সম্পাদক, লাইব্রেরি বিভাগ'),
        ('townclub', 'সম্পাদক, টাউন ক্লাব'),
        ('kids', 'সম্পাদক, শিশু চিকিৎসা কেন্দ্র'),
    ]

    type = models.CharField(max_length=50, choices=TYPE_CHOICES, unique=True)

    def __str__(self):
        return dict(self.TYPE_CHOICES).get(self.type)


class OldCommitteeMember(models.Model):
    category = models.ForeignKey(
        OldCommitteeCategory,
        on_delete=models.CASCADE,
        related_name='members'
    )
    name = models.CharField(max_length=200)
    year = models.CharField(max_length=100)
    image = models.ImageField(upload_to='oldcommittee/', blank=True, null=True)

    def __str__(self):
        return self.name