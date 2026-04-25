# members/urls.py

from django.urls import path
from .views import MemberListByType, VoterListView

urlpatterns = [
    path('voters/', VoterListView.as_view()),   # ✅ FIRST
    path('<str:type>/', MemberListByType.as_view()),
]