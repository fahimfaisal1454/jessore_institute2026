from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AboutUs, Person, Photo, Video, ApplicationForm
from .serializers import AboutUsSerializer, PersonSerializer, PhotoSerializer, VideoSerializer,  ApplicationFormSerializer


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