from django.contrib import admin
from .models import AboutUs,Person,Photo, Video, ApplicationForm

@admin.register(AboutUs)
class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('title', 'page_type')
    
    
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['title']
    
@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'order']
    ordering = ['order']


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'order']
    ordering = ['order']
    
@admin.register(ApplicationForm)
class ApplicationFormAdmin(admin.ModelAdmin):
    list_display = ['title', 'type']