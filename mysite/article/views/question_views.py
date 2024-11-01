from ..forms import QuestionForms, AnswerForms
from ..models import Question, Answer
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required




@login_required(login_url='common:login')
def question_create(request):
    #question_create가 실행되는 경우는 두가지. 
    # 1. question_list에서 '질문등록'을 누를 때 ==> get 방식 작동 
    # 2. question_form에서 '저장하기'를 누를 때. ==> post 방식 발동.
    # 두 상황 모두 (article.urls)"question/create/"로 이동하고 views.question_create룰 발동시킴!!
    # if 문 쓰면 두 가지 상황을 정의할 수 있기 때문에 '질문 등록', '저장하기' 두가지를 별개로 정의할 필요가 없다.
    if request.method == 'POST': # 요청이 post 방식인지 확인
        form = QuestionForms(request.POST) #QuestionForms에 입력값 넣기
        if form.is_valid(): #해당 form의 형식이 맞는지 검사
            #입력받은 subject와 content를 모델에 저장
            #모델에 저장은 하는데 해당 모델의 commit은 하지 않음
            #아직 create_date라는 속성값이 정의되지 않았기 때문에
            #commit을 하면 에러 발생 
            question = form.save(commit = False)  ##save는 디폴트로 commit=True를 가진다.  
            ## 붕 떠있는 form을 저장하기 위해서, question이라는 QuestionForms에 리퀘스트 값을 받아놓은 인스턴스 객체를 생성해준 후에 save를 진행한다.
            question.author = request.user  ## user는 내가 안만들어도 이미 request 내에 있어서 쓸 수 있는 속성. 
            question.create_date = timezone.now()
            #현재 시각으로 create_date 저장
            #model에서 필요한 모든 값이 저장되었음으로
            #commit 가능
            question.save()
            #commit 완료
            return redirect ('arti:index')
            #data의 저장이 끝나면 기본페이지로 이동
    else : 
        form = QuestionForms()
        return render(request, 'article/question_form.html', {'form':form})  #(받을 리퀘스트, 리스폰스 해줄 것. 보여줄 html, 리스폰스 대상에게 전달해줄 정보. {변수명(새로생성) : 실제 값})





@login_required(login_url='common:login')
def question_modify(request, question_id):
    question = get_object_or_404(Question, pk=question_id) # 모델에서 원래 게시글 땡겨옴 # question_id에 맞는 게시물 없으면 404 띄워라. 
    if request.user != question.author:
        messages.error(request, "수정권한없음")
        return redirect("arti:detail", question_id = question.id)

    #1. 수정 권한 확인
    if request.method == 'POST':
        form = QuestionForms(request.POST, instance = question) # question을 instance로 쓰겠다. 기본값은 instance=False
                                                                # 모델에서 땡겨온 원래 게시글을 폼에 적용해서 나타내주겠다. 
        if form.is_valid():
            question = form.save(commit=False)
            question.modify_date = timezone.now()
            question.save()
            return redirect('arti:detail', question_id = question.id)
    else:
        form = QuestionForms(instance = question)
    
    return render(request, 'article/question_form.html', {'form':form})





@login_required(login_url='common:login') #
def question_delete(request, question_id):
    question = get_object_or_404(Question, pk=question_id) # question_id에 맞는 게시물 없으면 404 띄워라. 
    if request.user != question.author:
        massages.error(request, "삭제권한없음")
        return redirect("arti:detail", question_id = question.id)
    
    #삭제하겠습니까? 를 묻는 창은 장고에서 안해준다. 자바스크립트를 해줘야함. base.html에서 작업해줌
    question.delete()
    return redirect('/')


    
@login_required(login_url='common:login')######################################################################################################
def question_vote(request, question_id):
    question = get_object_or_404(Question, pk = question_id) # question_id에 맞는 게시물 없으면 404 띄워라. 
    if request.user == question.author :
        messages.error(request, "스스로를 너무 사랑하시네요")
    else : 
        question.voter.add(request.user)
    return redirect("arti:detail", question_id = question.id)