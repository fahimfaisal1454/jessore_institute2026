from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import OldCommitteeCategory, OldCommitteeMember
from .serializers import OldCommitteeSerializer
from .serializers import OldCommitteeCategorySerializer


# 🔹 CATEGORY (optional: can be read-only)
class OldCommitteeCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = OldCommitteeCategory.objects.all()
    serializer_class = OldCommitteeCategorySerializer


# 🔹 MEMBERS (main CMS)
class OldCommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = OldCommitteeMember.objects.all().order_by('-id')
    serializer_class = OldCommitteeSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_context(self):
        return {"request": self.request}