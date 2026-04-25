from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CommitteeMember,OldCommitteeDocument,SubCommitteeCategory,ExecutiveCommittee
from .serializers import CommitteeMemberSerializer,OldCommitteeDocumentSerializer,SubCommitteeMemberSerializer, SubCommitteeDocumentSerializer, ExecutiveCommitteeSerializer


class ExecutiveCommitteeView(generics.ListAPIView):
    serializer_class = ExecutiveCommitteeSerializer

    def get_queryset(self):
        return ExecutiveCommittee.objects.filter(
            position__in=["president", "secretary"]
        )

    # ✅ ADD THIS
    def get_serializer_context(self):
        return {"request": self.request}

class CommitteeView(APIView):
    def get(self, request):
        head = CommitteeMember.objects.filter(role_type='head').first()
        members = CommitteeMember.objects.filter(role_type='member')

        return Response({
            "title": "পরিচালনা পরিষদ",
            "head": CommitteeMemberSerializer(head, context={'request': request}).data if head else None,
            "members": CommitteeMemberSerializer(members, many=True, context={'request': request}).data
        })
        
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
        
# 🔥 CURRENT
class SubCommitteeView(APIView):
    def get(self, request, type):
        category = SubCommitteeCategory.objects.get(type=type)

        head = category.members.filter(role_type='head').first()
        members = category.members.filter(role_type='member')

        return Response({
            "title": str(category),
            "head": SubCommitteeMemberSerializer(head, context={'request': request}).data if head else None,
            "members": SubCommitteeMemberSerializer(members, many=True, context={'request': request}).data
        })


# 🔥 OLD
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
        
