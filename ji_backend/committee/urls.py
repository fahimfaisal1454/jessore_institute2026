from django.urls import path
from .views import CommitteeView,OldCommitteeDocumentView,SubCommitteeView, SubCommitteeOldView

urlpatterns = [
    path('', CommitteeView.as_view()),
    path('old/', OldCommitteeDocumentView.as_view()),
    path('subcommittee/<str:type>/', SubCommitteeView.as_view()),
    path('subcommittee/<str:type>/old/', SubCommitteeOldView.as_view()),
    
]