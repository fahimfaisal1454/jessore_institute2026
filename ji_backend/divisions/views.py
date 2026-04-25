from rest_framework import generics
from .models import Division
from .serializers import DivisionSerializer

class DivisionDetailByCategory(generics.RetrieveAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    lookup_field = 'category'

    def get_serializer_context(self):
        return {'request': self.request}