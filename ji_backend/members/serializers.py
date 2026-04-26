# members/serializers.py

from rest_framework import serializers
from .models import Member, VoterList

class MemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Member
        fields = '__all__'

    def update(self, instance, validated_data):
        image = validated_data.get('image', None)

        if not image:
            validated_data.pop('image', None)

        return super().update(instance, validated_data)
    
class VoterListSerializer(serializers.ModelSerializer):
    donor_pdf = serializers.FileField(use_url=True)
    life_pdf = serializers.FileField(use_url=True)
    general_pdf = serializers.FileField(use_url=True)

    class Meta:
        model = VoterList
        fields = '__all__'

    def update(self, instance, validated_data):
        # 🔥 Prevent file overwrite if not updated
        for field in ['donor_pdf', 'life_pdf', 'general_pdf']:
            if not validated_data.get(field):
                validated_data.pop(field, None)

        return super().update(instance, validated_data)