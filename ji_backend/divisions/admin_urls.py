from rest_framework.routers import DefaultRouter
from .admin_views import DivisionAdminViewSet

router = DefaultRouter()
router.register('divisions', DivisionAdminViewSet)

urlpatterns = router.urls