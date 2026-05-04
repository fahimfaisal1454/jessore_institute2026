from django.urls import path
from .views import (
    AboutUsView,
    PersonView,
    PhotoView,
    VideoView,
    ApplicationFormView,
    InfoPageView,
    AnnualReportView,
    ContactMessageView,LibraryListView
)

urlpatterns = [
    path('person/', PersonView.as_view()),
    path('photos/', PhotoView.as_view()),
    path('videos/', VideoView.as_view()),
    path('form/<str:type>/', ApplicationFormView.as_view()),

    # ✅ IMPORTANT ORDER
    path("annual-report/", AnnualReportView.as_view()),
    path('info/<str:page_type>/', InfoPageView.as_view()),
    path("contact/", ContactMessageView.as_view()),
    path("libraries/", LibraryListView.as_view(), name="library-list"),

    # ❗ ALWAYS LAST
    path('<str:page_type>/', AboutUsView.as_view()),
]