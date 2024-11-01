from django.urls import path
from . import views
from django.contrib.auth import views as auth_views # as 써주면 그 이름으로 부를 수 있다.

app_name = "common"

urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name = 'common/login.html'), name='login'), #template_name : 원래 장고에서 예상하는 주소 말고, 이 주소로 재지정해주겠다.
    path("logout/", views.logout_view, name='logout'),
    path("signup/", views.signup, name='signup')
]
