from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Division
from .serializers import DivisionSerializer


class DivisionAdminViewSet(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {"request": self.request}