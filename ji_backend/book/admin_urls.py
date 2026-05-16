from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .admin_views import (
    BookCategoryAdminViewSet,
    BookMasterAdminViewSet,
    NextSerialAdminView,
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
    path('', include(router.urls)),

    # =========================
    # NEXT SERIAL
    # =========================
    path(
        'next-serial/',
        NextSerialAdminView.as_view(),
        name='admin-next-serial'
    ),
]