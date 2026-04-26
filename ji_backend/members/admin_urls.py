from rest_framework.routers import DefaultRouter
from .admin_views import MemberAdminViewSet, VoterListAdminViewSet

router = DefaultRouter()

router.register('members', MemberAdminViewSet)
router.register('voters', VoterListAdminViewSet)

urlpatterns = router.urls