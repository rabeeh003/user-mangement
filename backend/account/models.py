from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class UserDetail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_detail')
    profile = models.ImageField(upload_to='media/profile')