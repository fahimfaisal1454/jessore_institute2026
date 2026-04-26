# notice/serializers.py

from rest_framework import serializers
from .models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = Notice
        fields = ['id', 'title', 'type', 'file', 'content', 'date']

    def update(self, instance, validated_data):
        file = validated_data.get('file', None)

        if not file:
            validated_data.pop('file', None)

        return super().update(instance, validated_data)