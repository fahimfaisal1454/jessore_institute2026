# =========================
# FILE: aboutus/admin_urls.py
# =========================

from rest_framework.routers import DefaultRouter

from .admin_views import (
    AboutUsAdminViewSet,
    PersonAdminViewSet,
    PhotoAdminViewSet,
    VideoAdminViewSet,
    ApplicationFormAdminViewSet,
    InfoPageAdminViewSet,
    AnnualReportAdminViewSet,
    ContactMessageAdminViewSet,
    LibraryAdminViewSet,
    HeroSliderAdminViewSet,   
    MediaAdminViewSet,        
    PublicationAdminViewSet,  
)

router = DefaultRouter()

router.register("aboutus", AboutUsAdminViewSet)
router.register("person", PersonAdminViewSet)
router.register("photos", PhotoAdminViewSet)
router.register("videos", VideoAdminViewSet)
router.register("forms", ApplicationFormAdminViewSet)
router.register("infopages", InfoPageAdminViewSet)
router.register("reports", AnnualReportAdminViewSet)
router.register("contactus", ContactMessageAdminViewSet)
router.register("libraries", LibraryAdminViewSet)

# =========================
# HERO SLIDER CMS
# =========================
router.register("hero-slider", HeroSliderAdminViewSet)
router.register(
    "media",
    MediaAdminViewSet
)
router.register(
    "publication",
    PublicationAdminViewSet
)

urlpatterns = router.urls