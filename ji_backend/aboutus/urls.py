from django.urls import path
from .views import (
    AboutUsView,
    PersonView,
    PhotoView,
    VideoView,
    ApplicationFormView,
    InfoPageView,
    AnnualReportView,
    ContactMessageView,LibraryListView, HeroSliderListView, MediaListView, PublicationListView
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
     path(
        "hero-slider/",
        HeroSliderListView.as_view(),
        name="hero-slider"
    ),
     path(
    "media/",
    MediaListView.as_view(),
    name="media-list"
),
     path(
    "publications/",
    PublicationListView.as_view(),
    name="publication-list"
),

    # ❗ ALWAYS LAST
    path('<str:page_type>/', AboutUsView.as_view()),
]