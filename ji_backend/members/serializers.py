# members/serializers.py

from rest_framework import serializers
from .models import Member, VoterList

class MemberSerializer(serializers.ModelSerializer):
    full_mobile = serializers.ReadOnlyField()
    member_status = serializers.ReadOnlyField()

    class Meta:
        model = Member
        fields = [
            'id',

            # Basic Info
            'name',
            'member_code',
            'members_number',
            'si_no',
            'member_type',
            'include_date',

            # Family Info
            'father_name',
            'mother_name',

            # Personal Details
            'date_of_birth',
            'gender',
            'blood_group',
            'religion',
            'birth_certificate_no',
            'nid_no',
            'nationality',
            'passport_no',

            # Contact Info
            'primary_mobile_number',
            'secondary_mobile_number',
            'guardian_mobile_number',
            'email',

            # Present Address
            'present_address',
            'present_area',
            'present_thana',
            'present_district',

            # Permanent Address
            'permanent_address',
            'permanent_area',
            'permanent_thana',
            'permanent_district',

            # Media
            'photo',
            

            # Financial Info
            'form_no',
            'admission',
            'collateral',
            'donation',

            # Status
            'is_active',
            'death_date',

            # System Fields
            'created_at',
            'updated_at',

            # Properties
            'full_mobile',
            'member_status',
        ]

        read_only_fields = [
            'created_at',
            'updated_at',
            'full_mobile',
            'member_status',
        ]
    
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