# from django.urls import path, include
# from rest_framework import routers
# from .views import Signup

# router = routers.DefaultRouter()
# router.register(r'users', Signup)

# urlpatterns = [
#     path('', include(router.urls)),
#     path('api-auth/', include('rest_framework.urls')),
# ]

from django.urls import path
from .views import UserSignupView, ProfileView, UserProfileView, UpdateUserView, UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='signup'),
    path('user/update/<int:pk>/', UpdateUserView.as_view(), name='user_update'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/<int:user>/', UserProfileView.as_view(), name='user_profile'),
    path('user/<int:user>/', UserDetailView.as_view(), name='user_details'),
]