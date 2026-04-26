from rest_framework import serializers
from .models import Division

class DivisionSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Division
        fields = "__all__"

    def update(self, instance, validated_data):
        image = validated_data.get('image', None)

        # ✅ don't overwrite image if not provided
        if not image:
            validated_data.pop('image', None)

        return super().update(instance, validated_data)