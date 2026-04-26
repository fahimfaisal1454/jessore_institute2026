from rest_framework.routers import DefaultRouter
from .admin_views import NoticeAdminViewSet

router = DefaultRouter()
router.register('notices', NoticeAdminViewSet)

urlpatterns = router.urls