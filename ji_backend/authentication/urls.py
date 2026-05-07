from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    LoginView,
    CreateUserView,
    UserListView,
    UpdateUserRoleView,
    DeleteUserView,
    ResetUserPasswordView,
    ProfileView,
)

urlpatterns = [
    # =========================
    # AUTH LOGIN
    # =========================
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # =========================
    # USER PROFILE
    # =========================
    path('profile/', ProfileView.as_view(), name='profile'),

    # =========================
    # SUPERADMIN USER MANAGEMENT
    # =========================
    path('users/create/', CreateUserView.as_view(), name='create_user'),
    path('users/', UserListView.as_view(), name='user_list'),
    path(
        'users/<int:pk>/role/',
        UpdateUserRoleView.as_view(),
        name='update_user_role'
    ),
    path(
        'users/<int:pk>/delete/',
        DeleteUserView.as_view(),
        name='delete_user'
    ),
    path(
        'users/<int:pk>/reset-password/',
        ResetUserPasswordView.as_view(),
        name='reset_user_password'
    ),
]