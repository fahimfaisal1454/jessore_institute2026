from django.contrib import admin
from django.urls import path, include

# ✅ ADD THESE
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/aboutus/', include('aboutus.urls')),
    path('api/oldcommittee/', include('oldcommittee.urls')),
    path('api/committee/', include('committee.urls')),
    path('api/notice/', include('notice.urls')),
    path('api/divisions/', include('divisions.urls')),
    path('api/members/', include('members.urls')),
    path('api/', include('authentication.urls')),
        # ✅ ADMIN API (NEW)
    path('api/admin/', include('aboutus.admin_urls')),
    path('api/admin/committee/', include('committee.admin_urls')),
    path('api/admin/', include('notice.admin_urls')),
    path('api/admin/members/', include('members.admin_urls')),
    path('api/admin/divisions/', include('divisions.admin_urls')),
    path('api/admin/oldcommittee/', include('oldcommittee.admin_urls')),
]

# ✅ MEDIA SERVING
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)