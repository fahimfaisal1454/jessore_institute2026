from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import (
    Committee,
    CommitteeMember,
    OldCommitteeDocument,
    SubCommitteeCategory,
    ExecutiveCommittee,
)

from .serializers import (
    CommitteeSerializer,
    CommitteeMemberSerializer,
    OldCommitteeDocumentSerializer,
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


class CommitteeView(APIView):
    def get(self, request):
        committee = Committee.objects.filter(is_active=True).first()

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


class OldCommitteeDocumentView(APIView):
    def get(self, request):
        docs = OldCommitteeDocument.objects.all()

        return Response({
            "title": "পরিচালনা পরিষদ-প্রাক্তন",
            "data": OldCommitteeDocumentSerializer(
                docs,
                many=True,
                context={'request': request}
            ).data
        })


class SubCommitteeView(APIView):
    def get(self, request, type):
        category = SubCommitteeCategory.objects.get(type=type)

        head = category.members.filter(role_type='head').first()
        members = category.members.filter(role_type='member')

        return Response({
            "title": str(category),
            "head": (
                SubCommitteeMemberSerializer(
                    head,
                    context={'request': request}
                ).data
                if head else None
            ),
            "members": SubCommitteeMemberSerializer(
                members,
                many=True,
                context={'request': request}
            ).data
        })


class SubCommitteeOldView(APIView):
    def get(self, request, type):
        category = SubCommitteeCategory.objects.get(type=type)

        return Response({
            "title": f"{category} – প্রাক্তন",
            "data": SubCommitteeDocumentSerializer(
                category.documents.all(),
                many=True,
                context={'request': request}
            ).data
        })