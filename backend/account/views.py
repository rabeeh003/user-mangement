from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import UserSignupSerializer, UserDetailsSerializer, UserFullDetailsSerializer, AdminLoginSerializer
from .models import UserDetail

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

class UpdateUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    lookup_field = 'pk'

class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    lookup_field = 'pk'

class ProfileView(generics.CreateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailsSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailsSerializer
    lookup_field = 'user'
    permission_classes = [IsAuthenticated]

class UserDetailView(generics.RetrieveAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserFullDetailsSerializer
    lookup_field = 'user'
    # permission_classes = [IsAuthenticated]

class AllUserView(generics.ListAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserFullDetailsSerializer


class AdminLoginView(APIView):
    serializer_class = AdminLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=HTTP_200_OK)