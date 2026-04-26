from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Member, VoterList
from .serializers import MemberSerializer, VoterListSerializer


class MemberAdminViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('-id')
    serializer_class = MemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        return {"request": self.request}


class VoterListAdminViewSet(viewsets.ModelViewSet):
    queryset = VoterList.objects.all().order_by('-id')
    serializer_class = VoterListSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {"request": self.request}