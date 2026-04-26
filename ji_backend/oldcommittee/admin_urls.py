from rest_framework.routers import DefaultRouter
from .admin_views import (
    OldCommitteeCategoryAdminViewSet,
    OldCommitteeMemberAdminViewSet
)

router = DefaultRouter()

router.register('old-categories', OldCommitteeCategoryAdminViewSet)
router.register('old-members', OldCommitteeMemberAdminViewSet)

urlpatterns = router.urls