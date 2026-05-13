from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import AboutUs, Person, Photo, Video, ApplicationForm, InfoPage, AnnualReport, ContactMessage, Library, HeroSlider, Media, Publication
from .serializers import AboutUsSerializer, PersonSerializer, PhotoSerializer, VideoSerializer,  ApplicationFormSerializer, InfoPageSerializer, AnnualReportSerializer, ContactMessageSerializer, LibrarySerializer, HeroSliderSerializer, MediaSerializer, PublicationSerializer


class AboutUsView(APIView):
    def get(self, request, page_type):
        try:
            page = AboutUs.objects.get(page_type=page_type)
            return Response(AboutUsSerializer(page).data)
        except AboutUs.DoesNotExist:
            return Response({"error": "Not found"}, status=404)
        
        
class PersonView(APIView):
    def get(self, request):
        obj = Person.objects.first()

        return Response(
            PersonSerializer(obj).data if obj else {}
        )
        



class PhotoView(APIView):
    def get(self, request):
        photos = Photo.objects.all()
        return Response({
            "title": "ছবিঘর",
            "data": PhotoSerializer(photos, many=True, context={'request': request}).data
        })


class VideoView(APIView):
    def get(self, request):
        videos = Video.objects.all()
        return Response({
            "title": "ভিডিওঘর",
            "data": VideoSerializer(videos, many=True).data
        })
        
class ApplicationFormView(APIView):
    def get(self, request, type):
        try:
            form = ApplicationForm.objects.get(type=type)

            return Response(
                ApplicationFormSerializer(form, context={'request': request}).data
            )

        except ApplicationForm.DoesNotExist:
            return Response({"error": "Form not found"}, status=404)
        
class InfoPageView(APIView):
    def get(self, request, page_type):
        try:
            page = InfoPage.objects.get(page_type=page_type)
            serializer = InfoPageSerializer(page)
            return Response(serializer.data)
        except InfoPage.DoesNotExist:
            return Response({"error": "Not found"})
        
class AnnualReportView(ListAPIView):
    queryset = AnnualReport.objects.all().order_by("-publish_date")
    serializer_class = AnnualReportSerializer

    def get_serializer_context(self):
        return {"request": self.request}
    
class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Message sent successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LibraryListView(APIView):
    def get(self, request):
        libraries = Library.objects.all()

        return Response({
            "title": "দেশ বিদেশের বিভিন্ন লাইব্রেরির ঠিকানা/ওয়েবসাইট",
            "libraries": LibrarySerializer(libraries, many=True).data
        })
        
class HeroSliderListView(generics.ListAPIView):
    queryset = HeroSlider.objects.filter(is_active=True).order_by("order")
    serializer_class = HeroSliderSerializer

    def get_serializer_context(self):
        return {"request": self.request}
    
class MediaListView(APIView):
    def get(self, request):
        media_items = Media.objects.all()

        return Response({
            "title": "Media Information",
            "media": MediaSerializer(
                media_items,
                many=True
            ).data
        })
        
class PublicationListView(APIView):
    def get(self, request):
        publications = Publication.objects.all()

        return Response({
            "title": "প্রকাশনা",
            "publications": PublicationSerializer(
                publications,
                many=True
            ).data
        })