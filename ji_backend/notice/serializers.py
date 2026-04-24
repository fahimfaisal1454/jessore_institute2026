# notice/serializers.py

from rest_framework import serializers
from .models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    def get_file(self, obj):
        request = self.context.get('request')
        if obj.file:
            return request.build_absolute_uri(obj.file.url)
        return None

    class Meta:
        model = Notice
        fields = ['id', 'title', 'type', 'file', 'content', 'date']