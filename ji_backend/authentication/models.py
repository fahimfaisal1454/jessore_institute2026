from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('superadmin', 'Super Admin'),
        ('admin', 'Admin'),
        ('member', 'Member'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='member'
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    is_active_member = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

    @property
    def is_superadmin(self):
        return self.role == 'superadmin'

    @property
    def is_admin(self):
        return self.role in ['superadmin', 'admin']