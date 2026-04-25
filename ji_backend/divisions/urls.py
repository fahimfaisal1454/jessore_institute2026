from django.urls import path
from .views import DivisionDetailByCategory

urlpatterns = [
    path('<str:category>/', DivisionDetailByCategory.as_view()),
]