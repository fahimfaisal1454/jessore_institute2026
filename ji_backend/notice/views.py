# notice/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notice
from .serializers import NoticeSerializer


class NoticeView(APIView):
    def get(self, request):
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True, context={'request': request})
        return Response(serializer.data)