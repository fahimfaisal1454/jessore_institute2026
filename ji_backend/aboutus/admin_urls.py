from rest_framework.routers import DefaultRouter
from .admin_views import (
    AboutUsAdminViewSet,
    PersonAdminViewSet,
    PhotoAdminViewSet,
    VideoAdminViewSet,
    ApplicationFormAdminViewSet,
    InfoPageAdminViewSet,
    AnnualReportAdminViewSet,
    ContactMessageAdminViewSet
)

router = DefaultRouter()

router.register('aboutus', AboutUsAdminViewSet)
router.register('person', PersonAdminViewSet)
router.register('photos', PhotoAdminViewSet)
router.register('videos', VideoAdminViewSet)
router.register('forms', ApplicationFormAdminViewSet)
router.register('infopages', InfoPageAdminViewSet)
router.register('reports', AnnualReportAdminViewSet)
router.register('contactus', ContactMessageAdminViewSet)

urlpatterns = router.urls