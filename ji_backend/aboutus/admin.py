from django.contrib import admin
from .models import AboutUs,Person,Photo, Video, ApplicationForm, InfoPage, AnnualReport, ContactMessage

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
    
@admin.register(InfoPage)
class InfoPageAdmin(admin.ModelAdmin):
    list_display = ['page_type', 'title']
    
@admin.register(AnnualReport)
class AnnualReportAdmin(admin.ModelAdmin):
    list_display = ("title", "publish_date")
    
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")