from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    # =========================
    # DISPLAY
    # =========================
    list_display = (
        "id",
        "username",
        "email",
        "role",
        "phone",
        "is_active_member",
        "is_staff",
        "is_superuser",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_superuser",
        "is_active_member",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
        "phone",
    )

    ordering = ("-id",)

    # =========================
    # FIELD GROUPS
    # =========================
    fieldsets = (
        (
            "Login Info",
            {
                "fields": (
                    "username",
                    "password",
                )
            },
        ),
        (
            "Personal Info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "phone",
                )
            },
        ),
        (
            "Role Management",
            {
                "fields": (
                    "role",
                    "is_active_member",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )

    # =========================
    # ADD USER FORM
    # =========================
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "phone",
                    "role",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_superuser",
                    "is_active_member",
                ),
            },
        ),
    )

    # =========================
    # SUPERADMIN ONLY ACCESS
    # =========================
    def has_module_permission(self, request):
        return (
            request.user.is_authenticated
            and request.user.role == "superadmin"
        )

    def has_view_permission(self, request, obj=None):
        return (
            request.user.is_authenticated
            and request.user.role == "superadmin"
        )

    def has_change_permission(self, request, obj=None):
        return (
            request.user.is_authenticated
            and request.user.role == "superadmin"
        )

    def has_add_permission(self, request):
        return (
            request.user.is_authenticated
            and request.user.role == "superadmin"
        )

    def has_delete_permission(self, request, obj=None):
        return (
            request.user.is_authenticated
            and request.user.role == "superadmin"
        )