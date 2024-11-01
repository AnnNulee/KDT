from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth import logout, authenticate, login
from common.forms import UserForm

# Create your views here.

def logout_view(request):
    logout(request)
    return redirect('/')

def signup(request):
    #폼을 받는 리퀘스트이기 때문에 post 방식으로 받는다.
    if request.method == "POST" :
        form = UserForm(request.POST)
        if form.is_valid(): # is_valid 유효성 검사. 들어올 것들 다 들어왔어?
            form.save()
            username = form.cleaned_data.get('username') # cleaned_data : 보안.
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username = username, password = raw_password) # 사용자 인증
            login(request, user) # 로그인
            return redirect('/')
    else:
        form = UserForm()
    return render(request, 'common/signup.html', {'form':form})
    