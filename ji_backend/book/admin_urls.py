from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .admin_views import (
    BookCategoryAdminViewSet,
    BookMasterAdminViewSet,
    NextSerialAdminView,
    BulkBookUploadAPIView,
)

router = DefaultRouter()


# =========================
# BOOK CATEGORIES
# =========================
router.register(
    r"categories",
    BookCategoryAdminViewSet,
    basename="book-categories"
)


# =========================
# BOOK MASTER
# =========================
router.register(
    r"books",
    BookMasterAdminViewSet,
    basename="book-master"
)


urlpatterns = [

    # =========================
    # BULK BOOK UPLOAD
    # =========================
    # IMPORTANT:
    # Use separate root path to avoid router conflict
    path(
        'bulk-book-upload/',
        BulkBookUploadAPIView.as_view(),
        name='bulk-book-upload'
    ),

    # =========================
    # NEXT SERIAL
    # =========================
    path(
        'next-serial/',
        NextSerialAdminView.as_view(),
        name='admin-next-serial'
    ),

    # =========================
    # ROUTER URLS
    # =========================
    path('', include(router.urls)),
]