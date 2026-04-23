from rest_framework.views import APIView
from rest_framework.response import Response
from .models import OldCommitteeCategory
from .serializers import OldCommitteeSerializer

class OldCommitteeView(APIView):
    def get(self, request, type):
        try:
            category = OldCommitteeCategory.objects.get(type=type)
            members = category.members.all()

            return Response({
                "title": dict(OldCommitteeCategory.TYPE_CHOICES)[type],
                "data": OldCommitteeSerializer(members, many=True).data
            })

        except OldCommitteeCategory.DoesNotExist:
            return Response({"error": "Not found"}, status=404)