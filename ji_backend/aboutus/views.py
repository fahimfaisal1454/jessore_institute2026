from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AboutUs
from .serializers import AboutUsSerializer

class AboutUsView(APIView):
    def get(self, request, page_type):
        try:
            page = AboutUs.objects.get(page_type=page_type)
            return Response(AboutUsSerializer(page).data)
        except AboutUs.DoesNotExist:
            return Response({"error": "Not found"}, status=404)