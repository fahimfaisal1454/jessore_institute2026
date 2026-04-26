# notice/admin_views.py

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Notice
from .serializers import NoticeSerializer

class NoticeAdminViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all().order_by('-date')
    serializer_class = NoticeSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {"request": self.request}