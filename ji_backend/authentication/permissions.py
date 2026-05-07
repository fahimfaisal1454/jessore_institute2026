from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    """
    Only Super Admin can access
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == 'superadmin'
        )


class IsAdminOrSuperAdmin(BasePermission):
    """
    Admin + Superadmin access
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ['superadmin', 'admin']
        )


class IsMemberUser(BasePermission):
    """
    Member-only access
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == 'member'
        )