# members/serializers.py

from rest_framework import serializers
from .models import Member, VoterList

class MemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class VoterListSerializer(serializers.ModelSerializer):
    donor_pdf = serializers.SerializerMethodField()
    life_pdf = serializers.SerializerMethodField()
    general_pdf = serializers.SerializerMethodField()

    class Meta:
        model = VoterList
        fields = '__all__'

    def get_file_url(self, obj, field):
        request = self.context.get('request')
        file = getattr(obj, field)
        if file:
            return request.build_absolute_uri(file.url)
        return None

    def get_donor_pdf(self, obj):
        return self.get_file_url(obj, 'donor_pdf')

    def get_life_pdf(self, obj):
        return self.get_file_url(obj, 'life_pdf')

    def get_general_pdf(self, obj):
        return self.get_file_url(obj, 'general_pdf')