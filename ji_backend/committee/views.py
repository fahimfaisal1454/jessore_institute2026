from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import (
    Committee,
    CommitteeMember,
    OldCommitteeDocument,
    SubCommittee,
    SubCommitteeCategory,
    SubCommitteeMember,
    SubCommitteeDocument,
    ExecutiveCommittee,
)

from .serializers import (
    CommitteeSerializer,
    CommitteeMemberSerializer,
    OldCommitteeDocumentSerializer,
    SubCommitteeSerializer,
    SubCommitteeCategorySerializer,
    SubCommitteeMemberSerializer,
    SubCommitteeDocumentSerializer,
    ExecutiveCommitteeSerializer,
)


# =========================
# ADMIN VIEWSETS
# =========================

class CommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = Committee.objects.all()
    serializer_class = CommitteeSerializer


class CommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = CommitteeMember.objects.all()
    serializer_class = CommitteeMemberSerializer


class SubCommitteeAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommittee.objects.all()
    serializer_class = SubCommitteeSerializer


class SubCommitteeCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeCategory.objects.all()
    serializer_class = SubCommitteeCategorySerializer


class SubCommitteeMemberAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeMember.objects.all()
    serializer_class = SubCommitteeMemberSerializer


class SubCommitteeDocumentAdminViewSet(viewsets.ModelViewSet):
    queryset = SubCommitteeDocument.objects.all()
    serializer_class = SubCommitteeDocumentSerializer


# =========================
# PUBLIC VIEWS
# =========================

class ExecutiveCommitteeView(generics.ListAPIView):
    serializer_class = ExecutiveCommitteeSerializer

    def get_queryset(self):
        return ExecutiveCommittee.objects.filter(
            position__in=["president", "secretary"]
        )

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# ACTIVE MAIN COMMITTEE
# =========================
class CommitteeView(APIView):
    def get(self, request):
        committee = Committee.objects.filter(
            is_active=True
        ).first()

        if not committee:
            return Response({
                "title": "",
                "members": []
            })

        return Response(
            CommitteeSerializer(
                committee,
                context={"request": request}
            ).data
        )


# =========================
# OLD MAIN COMMITTEE PDF
# =========================
class OldCommitteeDocumentView(APIView):
    def get(self, request):
        docs = OldCommitteeDocument.objects.all()

        return Response({
            "title": "পরিচালনা পরিষদ-প্রাক্তন",
            "data": OldCommitteeDocumentSerializer(
                docs,
                many=True,
                context={"request": request}
            ).data
        })


# =========================
# ACTIVE SUB COMMITTEE
# URL Example:
# /subcommittee/library/
# =========================
class SubCommitteeView(APIView):
    def get(self, request, type):
        subcommittee_id = request.GET.get("subcommittee")

        categories = SubCommitteeCategory.objects.filter(type=type)

        if subcommittee_id:
            categories = categories.filter(
                subcommittee_id=subcommittee_id
            )
        else:
            categories = categories.filter(
                subcommittee__is_active=True
            )

        category = categories.first()

        if not category:
            return Response(
                {"detail": "Not found"},
                status=404
            )

        members = category.members.all().order_by("order")

        return Response({
            "title": f"{category.subcommittee.title} - {category.get_type_display()}",
            "members": SubCommitteeMemberSerializer(
                members,
                many=True,
                context={"request": request}
            ).data
        })

# =========================
# OLD SUB COMMITTEE PDF
# URL Example:
# /subcommittee/library/old/
# =========================

class SubCommitteeOldView(APIView):
    def get(self, request, type):
        category = get_object_or_404(
            SubCommitteeCategory,
            type=type
        )

        documents = category.documents.all()

        return Response({
            "subcommittee_title": (
                category.subcommittee.title
                if category.subcommittee else ""
            ),
            "category": category.get_type_display(),
            "title": f"{category.get_type_display()} – প্রাক্তন",
            "data": SubCommitteeDocumentSerializer(
                documents,
                many=True,
                context={"request": request}
            ).data
        })


# =========================
# ALL ACTIVE SUB COMMITTEES
# =========================
class ActiveSubCommitteeListView(APIView):
    def get(self, request):
        subcommittees = SubCommittee.objects.filter(
            is_active=True
        )

        return Response(
            SubCommitteeSerializer(
                subcommittees,
                many=True,
                context={"request": request}
            ).data
        )