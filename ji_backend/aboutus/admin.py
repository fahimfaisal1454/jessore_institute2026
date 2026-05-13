from django.contrib import admin
from .models import AboutUs,Person,Photo, Video, ApplicationForm, InfoPage, AnnualReport, ContactMessage, Library, HeroSlider, Media, Publication

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
    
@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = (
        "order",
        "library_name",
    )

    ordering = ("order",)

    search_fields = (
        "library_name",
        "library_address",
    )
    
@admin.register(HeroSlider)
class HeroSliderAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("title",)
    ordering = ("order",)
    
@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = (
        "information",   # FIRST clickable field
        "order",
        "date",
        "link",
    )

    list_editable = ("order",)
    search_fields = ("information",)
    ordering = ("order",)
    
    

@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = (
        "information",
        "order",
        "date",
        "link",
    )

    list_editable = ("order",)
    search_fields = ("information",)
    ordering = ("order",)