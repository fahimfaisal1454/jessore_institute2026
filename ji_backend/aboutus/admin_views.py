# =========================
# FILE: aboutus/admin_views.py
# FULL FIXED VERSION
# =========================

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import (
    AboutUs,
    Person,
    Photo,
    Video,
    ApplicationForm,
    InfoPage,
    AnnualReport,
    ContactMessage,
    Library,
    HeroSlider,
)

from .serializers import (
    AboutUsSerializer,
    PersonSerializer,
    PhotoSerializer,
    VideoSerializer,
    ApplicationFormSerializer,
    InfoPageSerializer,
    AnnualReportSerializer,
    ContactMessageSerializer,
    LibrarySerializer,
    HeroSliderSerializer,
)


# =========================
# ABOUT US ADMIN
# =========================
class AboutUsAdminViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer


# =========================
# PERSON ADMIN
# =========================
class PersonAdminViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


# =========================
# PHOTO ADMIN
# =========================
class PhotoAdminViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all().order_by("order")
    serializer_class = PhotoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]


# =========================
# VIDEO ADMIN
# =========================
class VideoAdminViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


# =========================
# APPLICATION FORM ADMIN
# =========================
class ApplicationFormAdminViewSet(viewsets.ModelViewSet):
    queryset = ApplicationForm.objects.all()
    serializer_class = ApplicationFormSerializer


# =========================
# INFO PAGE ADMIN
# =========================
class InfoPageAdminViewSet(viewsets.ModelViewSet):
    queryset = InfoPage.objects.all()
    serializer_class = InfoPageSerializer


# =========================
# ANNUAL REPORT ADMIN
# =========================
class AnnualReportAdminViewSet(viewsets.ModelViewSet):
    queryset = AnnualReport.objects.all()
    serializer_class = AnnualReportSerializer


# =========================
# CONTACT MESSAGE ADMIN
# =========================
class ContactMessageAdminViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by("-created_at")
    serializer_class = ContactMessageSerializer


# =========================
# LIBRARY ADMIN
# =========================
class LibraryAdminViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all().order_by("order")
    serializer_class = LibrarySerializer


# =========================
# HERO SLIDER ADMIN
# =========================
class HeroSliderAdminViewSet(viewsets.ModelViewSet):
    queryset = HeroSlider.objects.all().order_by("order")
    serializer_class = HeroSliderSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]