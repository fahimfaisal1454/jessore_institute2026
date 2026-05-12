from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, MemberListByType, VoterListView


router = DefaultRouter()
router.register(r'', MemberViewSet, basename='members')


urlpatterns = [
    # =========================
    # ADMIN FULL CRUD API
    # =========================
    path('', include(router.urls)),

    # =========================
    # PUBLIC MEMBER TYPE LISTS
    # =========================
    path('type/<str:type>/', MemberListByType.as_view(), name='member-by-type'),

    # =========================
    # VOTER LIST
    # =========================
    path('voters/', VoterListView.as_view(), name='voter-list'),
]