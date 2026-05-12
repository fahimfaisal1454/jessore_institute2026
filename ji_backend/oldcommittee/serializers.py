# FIX YOUR SERIALIZER ONLY

from rest_framework import serializers
from .models import OldCommitteeMember, OldCommitteeCategory


class OldCommitteeCategorySerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(
        source="get_type_display",
        read_only=True
    )

    class Meta:
        model = OldCommitteeCategory
        fields = ["id", "type", "type_display"]


class OldCommitteeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = OldCommitteeMember
        fields = ['id', 'category', 'name', 'year', 'image']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get('request')

        if instance.image:
            data['image'] = (
                request.build_absolute_uri(instance.image.url)
                if request
                else instance.image.url
            )

        return data

    def update(self, instance, validated_data):
        if 'image' not in validated_data:
            validated_data.pop('image', None)

        return super().update(instance, validated_data)