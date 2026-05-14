from rest_framework import viewsets, generics, permissions
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser
)

from .models import (
    Committee,
    ExecutiveCommittee,
    CommitteeMember,
    OldCommitteeDocument,
    SubCommittee,
    SubCommitteeMember,
    SubCommitteeDocument,
    SubCommitteeCategory,
    Employee
)

from .serializers import (
    CommitteeSerializer,
    ExecutiveCommitteeSerializer,
    CommitteeMemberSerializer,
    OldCommitteeDocumentSerializer,
    SubCommitteeSerializer,
    SubCommitteeMemberSerializer,
    SubCommitteeDocumentSerializer,
    SubCommitteeCategorySerializer,
    EmployeeSerializer
)


# =========================
# MAIN COMMITTEE TITLE ADMIN
# =========================
class CommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer
    parser_classes = [
        JSONParser,
        FormParser,
        MultiPartParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# EXECUTIVE COMMITTEE ADMIN
# =========================
class ExecutiveCommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = ExecutiveCommittee.objects.all()
    serializer_class = ExecutiveCommitteeSerializer
    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# MAIN COMMITTEE MEMBER ADMIN
# =========================
class CommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = CommitteeMember.objects.all().order_by("order")
    serializer_class = CommitteeMemberSerializer
    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# OLD COMMITTEE DOCUMENT ADMIN
# =========================
class OldCommitteeDocumentAdminViewSet(viewsets.ModelViewSet):
    queryset = OldCommitteeDocument.objects.all().order_by("order")
    serializer_class = OldCommitteeDocumentSerializer
    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# SUB COMMITTEE TITLE ADMIN
# =========================
class SubCommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommittee.objects.all()
    serializer_class = SubCommitteeSerializer
    parser_classes = [
        JSONParser,
        FormParser,
        MultiPartParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# SUB COMMITTEE CATEGORY ADMIN
# =========================
class SubCommitteeCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeCategory.objects.all().order_by("order")
    serializer_class = SubCommitteeCategorySerializer
    parser_classes = [
        JSONParser,
        FormParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# SUB COMMITTEE MEMBER ADMIN
# =========================
class SubCommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeMember.objects.all().order_by("order")
    serializer_class = SubCommitteeMemberSerializer
    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# SUB COMMITTEE DOCUMENT ADMIN
# =========================
class SubCommitteeDocumentAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeDocument.objects.all().order_by("order")
    serializer_class = SubCommitteeDocumentSerializer
    parser_classes = [
        MultiPartParser,
        FormParser
    ]

    def get_serializer_context(self):
        return {"request": self.request}
    
class EmployeeAdminViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by("department", "serial")
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {"request": self.request}