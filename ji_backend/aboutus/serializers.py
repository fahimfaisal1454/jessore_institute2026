from rest_framework import serializers
from .models import AboutUs, Person,Photo, Video, ApplicationForm, InfoPage, AnnualReport, ContactMessage


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = '__all__'
        


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'
        


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image']


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'url']
        
class ApplicationFormSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    def get_file(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)

    class Meta:
        model = ApplicationForm
        fields = ['title', 'file']
        
class InfoPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = InfoPage
        fields = "__all__"
        
class AnnualReportSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = AnnualReport
        fields = "__all__"

    def get_file(self, obj):
        request = self.context.get("request")
        if obj.file:
            return request.build_absolute_uri(obj.file.url)
        return None
    
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"