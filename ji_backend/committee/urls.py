from django.urls import path
from .views import (
    CommitteeView,
    OldCommitteeDocumentView,
    SubCommitteeView,
    SubCommitteeOldView,
    ExecutiveCommitteeView
)

urlpatterns = [
    # ✅ MAIN COMMITTEE
    path('', CommitteeView.as_view()),

    # ✅ OLD COMMITTEE DOCUMENTS
    path('old/', OldCommitteeDocumentView.as_view()),

    # ✅ EXECUTIVE (President + Secretary)
    path('executive/', ExecutiveCommitteeView.as_view()),

    # ✅ SUB COMMITTEE (CURRENT)
    path('subcommittee/<str:type>/', SubCommitteeView.as_view()),

    # ✅ SUB COMMITTEE (OLD DOCUMENTS)
    path('subcommittee/<str:type>/old/', SubCommitteeOldView.as_view()),
]