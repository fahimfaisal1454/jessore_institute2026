from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import UserSerializer, CreateUserSerializer
from .permissions import IsSuperAdmin


User = get_user_model()


# =========================
# JWT LOGIN WITH ROLE DATA
# =========================
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['role'] = user.role
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data['role'] = self.user.role
        data['username'] = self.user.username
        data['user_id'] = self.user.id

        return data


class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# =========================
# SUPERADMIN USER CREATE
# =========================
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]


# =========================
# SUPERADMIN USER LIST
# =========================
class UserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]


# =========================
# SUPERADMIN ROLE UPDATE
# =========================
class UpdateUserRoleView(APIView):
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        role = request.data.get("role")

        # Validate role
        if role not in ['superadmin', 'admin', 'member']:
            return Response(
                {"error": "Invalid role"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Prevent superadmin from removing own superadmin role
        if request.user.id == user.id and role != "superadmin":
            return Response(
                {
                    "error": "You cannot remove your own superadmin role"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update role
        user.role = role
        user.save()

        return Response({
            "message": "Role updated successfully",
            "user": UserSerializer(user).data
        })

# =========================
# SUPERADMIN DELETE USER
# =========================
class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    def delete(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent deleting own account
        if request.user.id == user.id:
            return Response(
                {"error": "You cannot delete your own account"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.delete()

        return Response(
            {"message": "User deleted successfully"},
            status=status.HTTP_200_OK
        )

# =========================
# USER PROFILE
# =========================
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    
class ResetUserPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_password = request.data.get("password")

        if not new_password or len(new_password) < 6:
            return Response(
                {
                    "error": "Password must be at least 6 characters"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # SUPERADMIN can reset anyone
        if request.user.role == "superadmin":
            pass

        # ADMIN can reset MEMBER only
        elif request.user.role == "admin":
            if user.role != "member":
                return Response(
                    {
                        "error": "Admins can reset member passwords only"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

        else:
            return Response(
                {
                    "error": "You do not have permission"
                },
                status=status.HTTP_403_FORBIDDEN
            )

        user.set_password(new_password)
        user.save()

        return Response({
            "message": f"Password reset successful for {user.username}"
        })