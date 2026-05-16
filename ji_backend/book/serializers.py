from rest_framework import serializers
from .models import BookCategory, BookMaster


class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = '__all__'


class BookMasterSerializer(serializers.ModelSerializer):
    book_category_name = serializers.CharField(source='book_category.category_name', read_only=True)

    class Meta:
        model = BookMaster
        fields = '__all__'