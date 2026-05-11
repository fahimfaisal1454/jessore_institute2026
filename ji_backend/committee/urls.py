from django.urls import path

from .views import (
    CommitteeView,
    OldCommitteeDocumentView,
    SubCommitteeView,
    SubCommitteeOldView,
    ExecutiveCommitteeView,
)

urlpatterns = [
    # ✅ PUBLIC API ONLY
    path('', CommitteeView.as_view()),
    path('old/', OldCommitteeDocumentView.as_view()),
    path('executive/', ExecutiveCommitteeView.as_view()),
    path('subcommittee/<str:type>/', SubCommitteeView.as_view()),
    path('subcommittee/<str:type>/old/', SubCommitteeOldView.as_view()),
    
]