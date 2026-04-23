from django.urls import path
from .views import OldCommitteeView

urlpatterns = [
    path('<str:type>/', OldCommitteeView.as_view()),
]