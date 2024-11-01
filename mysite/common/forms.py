from django import forms 
from django.contrib.auth.forms import UserCreationForm ## 유저 생성 폼
from django.contrib.auth.models import User ## 유저 model

class UserForm(UserCreationForm) : 
    email = forms.EmailField(label = '이메일')
    
    class Meta :
        model = User # 유저라는 모델 쓰겠다. 
        fields = ("username", "password1", "password2", "email")  # user 모델에 이미 있음. 내가 정의한게 아님. 내가 정의하려면 models.py에 넣어야 한다.
        
        
        