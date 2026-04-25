# members/views.py

from rest_framework import generics
from .models import Member, VoterList
from .serializers import MemberSerializer, VoterListSerializer

class MemberListByType(generics.ListAPIView):
    serializer_class = MemberSerializer

    def get_queryset(self):
        member_type = self.kwargs['type']
        return Member.objects.filter(member_type=member_type).order_by('id')

    def get_serializer_context(self):
        return {'request': self.request}
    
class VoterListView(generics.ListAPIView):
    queryset = VoterList.objects.all().order_by('-id')
    serializer_class = VoterListSerializer

    def get_serializer_context(self):
        return {'request': self.request}