from rest_framework.routers import DefaultRouter

from .admin_views import (
    CommitteeAdminViewSet,
    ExecutiveCommitteeAdminViewSet,
    CommitteeMemberAdminViewSet,
    OldCommitteeDocumentAdminViewSet,
    SubCommitteeMemberAdminViewSet,
    SubCommitteeDocumentAdminViewSet,
    SubCommitteeCategoryAdminViewSet,
)

router = DefaultRouter()

# ✅ MAIN COMMITTEE TITLES
router.register(
    r"committees",
    CommitteeAdminViewSet,
    basename="committees"
)

# ✅ MAIN COMMITTEE MEMBERS
router.register(
    r"members",
    CommitteeMemberAdminViewSet,
    basename="members"
)

# ✅ EXECUTIVE COMMITTEE
router.register(
    r"executive",
    ExecutiveCommitteeAdminViewSet,
    basename="executive"
)

# ✅ OLD MAIN COMMITTEE DOCUMENTS
router.register(
    r"old-docs",
    OldCommitteeDocumentAdminViewSet,
    basename="old-docs"
)

# ✅ SUB COMMITTEE CATEGORIES
router.register(
    r"sub-categories",
    SubCommitteeCategoryAdminViewSet,
    basename="sub-categories"
)

# ✅ SUB COMMITTEE MEMBERS
router.register(
    r"sub-members",
    SubCommitteeMemberAdminViewSet,
    basename="sub-members"
)

# ✅ SUB COMMITTEE DOCUMENTS
router.register(
    r"sub-docs",
    SubCommitteeDocumentAdminViewSet,
    basename="sub-docs"
)

urlpatterns = router.urls