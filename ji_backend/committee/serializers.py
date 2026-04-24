from rest_framework import serializers
from .models import CommitteeMember,OldCommitteeDocument,SubCommitteeMember, SubCommitteeDocument


class CommitteeMemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CommitteeMember
        fields = ['id', 'name', 'role', 'image', 'role_type']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class OldCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = OldCommitteeDocument
        fields = ['id', 'year', 'file']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)
    
class SubCommitteeMemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SubCommitteeMember
        fields = ['id', 'name', 'role', 'image', 'role_type']

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)


class SubCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = SubCommitteeDocument
        fields = ['id', 'year', 'file']

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)