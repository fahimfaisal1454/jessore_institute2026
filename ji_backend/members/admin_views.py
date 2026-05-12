from rest_framework import viewsets, filters
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Member, VoterList
from .serializers import MemberSerializer, VoterListSerializer


# =========================
# MEMBER ADMIN FULL CRUD
# =========================
class MemberAdminViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all().order_by('-id')
    serializer_class = MemberSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        'name',
        'member_code',
        'members_number',
        'si_no',
        'father_name',
        'mother_name',
        'nid_no',
        'birth_certificate_no',
        'primary_mobile_number',
        'secondary_mobile_number',
        'guardian_mobile_number',
        'email',
    ]

    ordering_fields = [
        'id',
        'si_no',
        'name',
        'member_code',
        'include_date',
        'created_at',
    ]

    def get_queryset(self):
        queryset = Member.objects.all()

        member_type = self.request.query_params.get('member_type')
        if member_type:
            queryset = queryset.filter(member_type=member_type)

        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            if is_active.lower() == 'true':
                queryset = queryset.filter(is_active=True)
            elif is_active.lower() == 'false':
                queryset = queryset.filter(is_active=False)

        return queryset.order_by('-id')

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# VOTER LIST ADMIN FULL CRUD
# =========================
class VoterListAdminViewSet(viewsets.ModelViewSet):
    queryset = VoterList.objects.all().order_by('-id')
    serializer_class = VoterListSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser,
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    search_fields = [
        'name',
    ]

    ordering_fields = [
        'id',
        'created_at',
    ]

    def get_serializer_context(self):
        return {"request": self.request}