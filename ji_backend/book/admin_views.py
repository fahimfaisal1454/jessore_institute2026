from django.db.models import Max
from django.db import transaction
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser
)

from .models import BookCategory, BookMaster
from .serializers import (
    BookCategorySerializer,
    BookMasterSerializer
)


# =========================
# BOOK CATEGORY ADMIN
# =========================
class BookCategoryAdminViewSet(viewsets.ModelViewSet):
    queryset = BookCategory.objects.all().order_by("category_code")
    serializer_class = BookCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    parser_classes = [
        JSONParser,
        FormParser,
        MultiPartParser
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = [
        'category_code',
        'category_name',
        'category_name_bangla'
    ]

    ordering_fields = [
        'category_code',
        'category_name'
    ]

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# BOOK MASTER ADMIN
# =========================
class BookMasterAdminViewSet(viewsets.ModelViewSet):
    queryset = BookMaster.objects.filter(
        is_deleted=False
    ).order_by(
        "version",
        "serial_no"
    )

    serializer_class = BookMasterSerializer
    permission_classes = [permissions.IsAuthenticated]

    parser_classes = [
        JSONParser,
        FormParser,
        MultiPartParser
    ]

    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter
    ]

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

    def get_serializer_context(self):
        return {"request": self.request}


# =========================
# NEXT SERIAL ADMIN
# =========================
class NextSerialAdminView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        version = request.GET.get("version")

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
        
        
# =========================
# BULK BOOK UPLOAD ADMIN
# =========================
class BulkBookUploadAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser]

    def safe_date(self, value):
        """
        Convert any frontend date into YYYY-MM-DD
        """
        if not value:
            return timezone.now().date()

        try:
            # Handle ISO format
            if "T" in str(value):
                return datetime.fromisoformat(
                    str(value).replace("Z", "+00:00")
                ).date()

            return datetime.strptime(
                str(value),
                "%Y-%m-%d"
            ).date()

        except:
            try:
                return datetime.strptime(
                    str(value),
                    "%m/%d/%Y"
                ).date()
            except:
                return timezone.now().date()

    def post(self, request):
        rows = request.data.get("rows", [])

        if not rows:
            return Response(
                {"error": "No Excel data provided."},
                status=400
            )

        success_count = 0
        failed_rows = []

        for index, row in enumerate(rows, start=1):
            try:
                with transaction.atomic():

                    version = row.get("version")

                    if not version:
                        raise Exception("Version is required")

                    category_code = str(
                        row.get("category_code", "")
                    ).strip()

                    # =====================================================
                    # BARCODE
                    # =====================================================
                    bar_code = str(
                        row.get("bar_code")
                        or row.get("barcode")
                        or row.get("BarCode")
                        or row.get("Barcode")
                        or row.get("BARCODE")
                        or row.get("Bar Code")
                        or row.get("Barcode *")
                        or row.get("Barcode No")
                        or row.get("BarCodeNo")
                        or f"BC{timezone.now().strftime('%Y%m%d%H%M%S')}{index}"
                    ).strip()

                    # =====================================================
                    # DATE FIX
                    # =====================================================
                    raw_addition_date = (
                        row.get("book_addition_date")
                        or row.get("BookAdditionDate")
                        or row.get("AdditionDate")
                        or row.get("Book Addition Date")
                        or row.get("Addition Date")
                    )

                    book_addition_date = self.safe_date(
                        raw_addition_date
                    )

                    raw_release_date = (
                        row.get("release_date")
                        or row.get("ReleaseDate")
                    )

                    release_date = (
                        self.safe_date(raw_release_date)
                        if raw_release_date
                        else None
                    )

                    # =====================================================
                    # REQUIRED FIELDS
                    # =====================================================
                    if not row.get("book_code"):
                        raise Exception("Book code is required")

                    if not row.get("book_name"):
                        raise Exception("Book name is required")

                    if not bar_code:
                        raise Exception("Barcode is required")

                    if not row.get("call_no"):
                        raise Exception("Call No is required")

                    # =====================================================
                    # DUPLICATE CHECK
                    # =====================================================
                    if BookMaster.objects.filter(
                        book_code=row["book_code"]
                    ).exists():
                        raise Exception("Duplicate book_code")

                    if BookMaster.objects.filter(
                        bar_code=bar_code
                    ).exists():
                        raise Exception("Duplicate bar_code")

                    # =====================================================
                    # CATEGORY
                    # =====================================================
                    category = None

                    if category_code:
                        category = BookCategory.objects.filter(
                            category_code=category_code
                        ).first()

                        if not category:
                            raise Exception(
                                f"Category code '{category_code}' not found"
                            )

                    # =====================================================
                    # SERIAL
                    # =====================================================
                    last_book = (
                        BookMaster.objects
                        .select_for_update()
                        .filter(version=version)
                        .order_by("-serial_no")
                        .first()
                    )

                    next_serial = (
                        1 if not last_book
                        else last_book.serial_no + 1
                    )

                    # =====================================================
                    # PRICE
                    # =====================================================
                    try:
                        price = float(
                            row.get("price") or 0
                        )
                    except:
                        price = 0

                    # =====================================================
                    # PAGE
                    # =====================================================
                    try:
                        page_no = int(
                            row.get("book_page_no")
                        ) if row.get("book_page_no") else None
                    except:
                        page_no = None

                    # =====================================================
                    # CREATE
                    # =====================================================
                    BookMaster.objects.create(
                        version=version,
                        serial_no=next_serial,

                        book_code=str(
                            row.get("book_code", "")
                        ).strip(),

                        book_addition_number=str(
                            row.get("book_addition_number", "")
                        ).strip(),

                        book_addition_date=book_addition_date,

                        book_name=str(
                            row.get("book_name", "")
                        ).strip(),

                        author_name=str(
                            row.get("author_name", "")
                        ).strip(),

                        editor_name=str(
                            row.get("editor_name", "")
                        ).strip(),

                        translator_name=str(
                            row.get("translator_name", "")
                        ).strip(),

                        book_category=category,

                        call_no=str(
                            row.get("call_no", "")
                        ).strip(),

                        isbn_number=str(
                            row.get("isbn_number", "")
                        ).strip(),

                        copy_no=str(
                            row.get("copy_no", "")
                        ).strip(),

                        publisher_name=str(
                            row.get("publisher_name", "")
                        ).strip(),

                        place_of_publication=str(
                            row.get("place_of_publication", "")
                        ).strip(),

                        release_date=release_date,

                        price=price,

                        book_page_no=page_no,

                        source=str(
                            row.get("source", "ক্রয়")
                        ).strip(),

                        place=str(
                            row.get("place", "")
                        ).strip(),

                        floor_no=str(
                            row.get("floor_no", "")
                        ).strip(),

                        cupboard=str(
                            row.get("cupboard", "")
                        ).strip(),

                        rack_no=str(
                            row.get("rack_no", "")
                        ).strip(),

                        bar_code=bar_code,

                        remarks=str(
                            row.get("remarks", "")
                        ).strip(),

                        is_active=bool(
                            row.get("is_active", True)
                        ),

                        is_deleted=False,
                    )

                    success_count += 1

            except Exception as e:
                failed_rows.append({
                    "row_number": index,
                    "book_name": row.get(
                        "book_name", "Unknown"
                    ),
                    "error": str(e),
                })

        return Response({
            "success_count": success_count,
            "failed_count": len(failed_rows),
            "failed_rows": failed_rows,
        })