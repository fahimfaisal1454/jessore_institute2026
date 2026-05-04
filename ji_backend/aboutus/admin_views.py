from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import (
    AboutUs, Person, Photo, Video,
    ApplicationForm, InfoPage, AnnualReport, ContactMessage,Library
)
from .serializers import (
    AboutUsSerializer, PersonSerializer, PhotoSerializer,
    VideoSerializer, ApplicationFormSerializer,
    InfoPageSerializer, AnnualReportSerializer,ContactMessageSerializer,LibrarySerializer
)

# ✅ AboutUs Admin
class AboutUsAdminViewSet(viewsets.ModelViewSet):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer


# ✅ Person Admin
class PersonAdminViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


# ✅ Photo Admin
class PhotoAdminViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all().order_by('order')
    serializer_class = PhotoSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

# ✅ Video Admin
class VideoAdminViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


# ✅ Application Form Admin
class ApplicationFormAdminViewSet(viewsets.ModelViewSet):
    queryset = ApplicationForm.objects.all()
    serializer_class = ApplicationFormSerializer


# ✅ Info Page Admin
class InfoPageAdminViewSet(viewsets.ModelViewSet):
    queryset = InfoPage.objects.all()
    serializer_class = InfoPageSerializer


# ✅ Annual Report Admin
class AnnualReportAdminViewSet(viewsets.ModelViewSet):
    queryset = AnnualReport.objects.all()
    serializer_class = AnnualReportSerializer
    
class ContactMessageAdminViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    
class LibraryAdminViewSet(viewsets.ModelViewSet):
    queryset = Library.objects.all().order_by("order")
    serializer_class = LibrarySerializer