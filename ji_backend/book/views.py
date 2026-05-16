from django.db.models import Max
from django.db import transaction
from rest_framework import viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import BookCategory, BookMaster
from .serializers import BookCategorySerializer, BookMasterSerializer


# =========================
# BOOK CATEGORY
# =========================
class BookCategoryViewSet(viewsets.ModelViewSet):
    queryset = BookCategory.objects.filter(is_active=True).order_by('category_code')
    serializer_class = BookCategorySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['category_code', 'category_name', 'category_name_bangla']
    ordering_fields = ['category_code', 'category_name']


# =========================
# BOOK MASTER
# =========================
class BookMasterViewSet(viewsets.ModelViewSet):
    queryset = BookMaster.objects.filter(is_deleted=False).order_by('version', 'serial_no')
    serializer_class = BookMasterSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]

    search_fields = [
        'serial_no',
        'book_code',
        'bar_code',
        'book_name',
        'author_name',
        'editor_name',
        'translator_name',
        'isbn_number',
        'call_no',
        'publisher_name',
    ]

    ordering_fields = [
        'serial_no',
        'book_name',
        'author_name',
        'created_at',
    ]


# =========================
# NEXT SERIAL SAFE
# =========================
class NextSerialView(APIView):
    def get(self, request):
        version = request.GET.get('version')

        if not version:
            return Response(
                {"error": "Version is required"},
                status=400
            )

        with transaction.atomic():
            last_book = BookMaster.objects.select_for_update().filter(
                version=version
            ).order_by('-serial_no').first()

            next_serial = 1 if not last_book else last_book.serial_no + 1

        return Response({
            "version": version,
            "serial_no": next_serial
        })