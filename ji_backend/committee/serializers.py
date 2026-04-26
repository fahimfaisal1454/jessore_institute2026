from rest_framework import serializers
from .models import CommitteeMember,OldCommitteeDocument,SubCommitteeMember, SubCommitteeDocument, ExecutiveCommittee, SubCommitteeCategory


class ExecutiveCommitteeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ExecutiveCommittee
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class CommitteeMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = CommitteeMember
        fields = ['id', 'name', 'role', 'image', 'role_type', 'order']

    def update(self, instance, validated_data):
        image = validated_data.get('image', None)

        if not image:
            validated_data.pop('image', None)

        return super().update(instance, validated_data)
    
class OldCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = OldCommitteeDocument
        fields = ['id', 'year', 'file', 'order']
    
class SubCommitteeMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = SubCommitteeMember
        fields = ['id', 'name', 'role', 'image', 'role_type', 'category', 'order']

    def update(self, instance, validated_data):
        image = validated_data.get('image', None)
        if not image:
            validated_data.pop('image', None)
        return super().update(instance, validated_data)

class SubCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = SubCommitteeDocument
        fields = ['id', 'year', 'file', 'category', 'order']

    def update(self, instance, validated_data):
        file = validated_data.get('file', None)

        if not file:
            validated_data.pop('file', None)

        return super().update(instance, validated_data)
    
class SubCommitteeCategorySerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = SubCommitteeCategory
        fields = ["id", "type", "label"]

    def get_label(self, obj):
        return obj.get_type_display()