from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookCategoryViewSet, BookMasterViewSet, NextSerialView

router = DefaultRouter()
router.register(r'categories', BookCategoryViewSet)
router.register(r'books', BookMasterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('next-serial/', NextSerialView.as_view(), name='next-serial'),
]