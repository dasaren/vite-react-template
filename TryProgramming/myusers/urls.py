from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, UsersView, RetrieveUserView, getUserProfile, updateUserProfile, userProfile, userProfileUpdate, userProfiles

app_name = 'myusers'
urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    # path('', UsersView.as_view()),
    path('list', UsersView.as_view()),

    path('me', RetrieveUserView.as_view()),
    # path('profile/', getUserProfile.as_view()),
    path('profile/update/', updateUserProfile.as_view()),
    # path('profile/', getUserProfile.as_view()),
    path('user/<slug:username>/', userProfiles.as_view(), name='user-profiles'),
    path('user-profile/', userProfile.as_view(), name='user-profile'),
    path('user-profile/<str:pk>/',
         userProfileUpdate.as_view(), name='user-profile'),



]
