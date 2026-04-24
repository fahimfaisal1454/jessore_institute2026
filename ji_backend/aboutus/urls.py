from django.urls import path
from .views import AboutUsView, PersonView, PhotoView, VideoView, ApplicationFormView

urlpatterns = [
    path('person/', PersonView.as_view()),

    path('photos/', PhotoView.as_view()),   # ✅ ADD
    path('videos/', VideoView.as_view()),   # ✅ ADD
    path('form/<str:type>/', ApplicationFormView.as_view()), 
    path('<str:page_type>/', AboutUsView.as_view()),
    
]