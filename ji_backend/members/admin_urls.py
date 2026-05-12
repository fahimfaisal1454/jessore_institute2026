from django.urls import path
from rest_framework.routers import DefaultRouter
from .admin_views import MemberAdminViewSet, VoterListAdminViewSet

router = DefaultRouter()

# =========================
# MEMBER ADMIN CRUD
# =========================
router.register(r'members', MemberAdminViewSet, basename='admin-members')

# =========================
# VOTER ADMIN CRUD
# =========================
router.register(r'voters', VoterListAdminViewSet, basename='admin-voters')

urlpatterns = router.urls