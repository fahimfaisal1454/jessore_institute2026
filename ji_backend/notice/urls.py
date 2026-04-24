# notice/urls.py

from django.urls import path
from .views import NoticeView

urlpatterns = [
    path('', NoticeView.as_view()),
]