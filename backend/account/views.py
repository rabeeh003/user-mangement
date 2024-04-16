from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSignupSerializer, UserDetailsSerializer
from .models import UserDetail

class UserSignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer

class UpdateUserView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSignupSerializer
    lookup_field = 'pk'

class ProfileView(generics.ListCreateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserDetail.objects.all()
    serializer_class = UserDetailsSerializer
    lookup_field = 'user'
    permission_classes = [IsAuthenticated]
