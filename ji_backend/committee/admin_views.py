from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import (
    ExecutiveCommittee,
    CommitteeMember,
    OldCommitteeDocument,
    SubCommitteeMember,
    SubCommitteeDocument,
    SubCommitteeCategory
)

from .serializers import (
    ExecutiveCommitteeSerializer,
    CommitteeMemberSerializer,
    OldCommitteeDocumentSerializer,
    SubCommitteeMemberSerializer,
    SubCommitteeDocumentSerializer,SubCommitteeCategorySerializer
)

class ExecutiveCommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = ExecutiveCommittee.objects.all()
    serializer_class = ExecutiveCommitteeSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    
class CommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = CommitteeMember.objects.all().order_by('order')
    serializer_class = CommitteeMemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    # ✅ ADD THIS
    def get_serializer_context(self):
        return {"request": self.request}
    
class OldCommitteeDocumentAdminViewSet(viewsets.ModelViewSet):
    queryset = OldCommitteeDocument.objects.all().order_by('order')
    serializer_class = OldCommitteeDocumentSerializer
    parser_classes = [MultiPartParser, FormParser]
    
class SubCommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeMember.objects.all().order_by('order')
    serializer_class = SubCommitteeMemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    
class SubCommitteeDocumentAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeDocument.objects.all().order_by('order')
    serializer_class = SubCommitteeDocumentSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    
class SubCommitteeCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeCategory.objects.all()
    serializer_class = SubCommitteeCategorySerializer
