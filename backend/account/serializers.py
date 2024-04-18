from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserDetail
class UserSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password', "first_name"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        if 'password' not in validated_data:
            validated_data.pop('password', None)
        return super().update(instance, validated_data)



class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['user', 'profile']
        # depth = 1

class UserFullDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetail
        fields = ['user', 'profile']
        depth = 1

class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username is None or password is None:
            raise serializers.ValidationError("Both username and password are required.")

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")

        if not user.check_password(data['password']):
            raise serializers.ValidationError("Invalid username or password.")

        if not user.is_superuser:
            raise serializers.ValidationError("User is not a superuser.")

        return user