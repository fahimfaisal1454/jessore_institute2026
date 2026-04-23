from django.urls import path
from .views import AboutUsView

urlpatterns = [
    path('<str:page_type>/', AboutUsView.as_view(), name='aboutus-detail'),
]