from rest_framework.routers import DefaultRouter
from .admin_views import (
    ExecutiveCommitteeAdminViewSet,
    CommitteeMemberAdminViewSet,
    OldCommitteeDocumentAdminViewSet,
    SubCommitteeMemberAdminViewSet,
    SubCommitteeDocumentAdminViewSet,
    SubCommitteeCategoryAdminViewSet
)

router = DefaultRouter()

router.register('executive', ExecutiveCommitteeAdminViewSet)
router.register('members', CommitteeMemberAdminViewSet)
router.register('old-docs', OldCommitteeDocumentAdminViewSet)
router.register('sub-categories', SubCommitteeCategoryAdminViewSet)
router.register('sub-members', SubCommitteeMemberAdminViewSet)
router.register('sub-docs', SubCommitteeDocumentAdminViewSet)

urlpatterns = router.urls