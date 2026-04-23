from rest_framework import serializers
from .models import OldCommitteeMember

class OldCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OldCommitteeMember
        fields = ['id', 'name', 'year', 'image']