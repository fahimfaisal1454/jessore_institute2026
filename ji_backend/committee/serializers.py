from rest_framework import serializers
from .models import (
    CommitteeMember,
    OldCommitteeDocument,
    SubCommitteeMember,
    SubCommitteeDocument,
    ExecutiveCommittee,
    SubCommitteeCategory,
    Committee,
    SubCommittee,
)


# =========================
# EXECUTIVE COMMITTEE
# =========================
class ExecutiveCommitteeSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    # Bangla position label
    position_display = serializers.CharField(
        source="get_position_display",
        read_only=True
    )

    class Meta:
        model = ExecutiveCommittee
        fields = [
            "id",
            "position",
            "position_display",
            "name",
            "details",
            "image",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        request = self.context.get("request")

        if instance.image:
            representation["image"] = (
                request.build_absolute_uri(instance.image.url)
                if request
                else instance.image.url
            )

        return representation

    def update(self, instance, validated_data):
        # Keep old image if no new image uploaded
        if "image" not in validated_data:
            validated_data.pop("image", None)

        return super().update(instance, validated_data)


# =========================
# MAIN COMMITTEE MEMBERS
# =========================
class CommitteeMemberSerializer(serializers.ModelSerializer):
    committee_title = serializers.CharField(
        source="committee.title",
        read_only=True
    )

    class Meta:
        model = CommitteeMember
        fields = [
            "id",
            "committee",
            "committee_title",
            "committee_role",
            "member_name",
            "member_number",
            "image",
            "order",
        ]


# =========================
# MAIN COMMITTEE
# =========================
class CommitteeSerializer(serializers.ModelSerializer):
    members = CommitteeMemberSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Committee
        fields = [
            "id",
            "title",
            "is_active",
            "members",
        ]


# =========================
# OLD COMMITTEE PDF
# =========================
class OldCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = OldCommitteeDocument
        fields = [
            "id",
            "year",
            "file",
            "order"
        ]


# =========================
# SUB COMMITTEE MEMBER
# =========================
class SubCommitteeMemberSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        use_url=True,
        required=False,
        allow_null=True
    )

    category_type = serializers.CharField(
        source="category.get_type_display",
        read_only=True
    )

    subcommittee_title = serializers.CharField(
        source="category.subcommittee.title",
        read_only=True
    )

    class Meta:
        model = SubCommitteeMember
        fields = [
            "id",
            "category",
            "category_type",
            "subcommittee_title",
            "member_role",
            "member_name",
            "member_number",
            "image",
            "order",
        ]

    def update(self, instance, validated_data):
        image = validated_data.get("image", None)

        if not image:
            validated_data.pop("image", None)

        return super().update(instance, validated_data)


# =========================
# SUB COMMITTEE DOCUMENT
# =========================
class SubCommitteeDocumentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    category_type = serializers.CharField(
        source="category.get_type_display",
        read_only=True
    )

    class Meta:
        model = SubCommitteeDocument
        fields = [
            "id",
            "year",
            "file",
            "category",
            "category_type",
            "order",
        ]

    def update(self, instance, validated_data):
        file = validated_data.get("file", None)

        if not file:
            validated_data.pop("file", None)

        return super().update(instance, validated_data)


# =========================
# SUB COMMITTEE CATEGORY
# =========================
class SubCommitteeCategorySerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    subcommittee_title = serializers.CharField(
        source="subcommittee.title",
        read_only=True
    )

    class Meta:
        model = SubCommitteeCategory
        fields = [
            "id",
            "subcommittee",
            "subcommittee_title",
            "type",
            "label",
            "order",
        ]

    def get_label(self, obj):
        return obj.get_type_display()


# =========================
# SUB COMMITTEE TITLE
# =========================
class SubCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCommittee
        fields = [
            "id",
            "title",
            "is_active",
        ]