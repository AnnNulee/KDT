from ..models import Question, Answer
from ..forms import QuestionForms, AnswerForms
from django.shortcuts import render, get_object_or_404, redirect, resolve_url
from django.http import HttpResponse, HttpResponseNotAllowed
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib import messages



@login_required(login_url='common:login')
def answer_create(request, question_id): ## id 꼭 필요. 
    question = get_object_or_404(Question, pk=question_id)  # id 없는것들은 싸그리 404로 날려버리겠다.
    if request.method == 'POST':
        form = AnswerForms(request.POST) #id가 포함되지 않은 form. 그래서 추후에 context로 id가 포함된 question 변수도 묶어줘야한다. 
        if form.is_valid():
            answer = form.save(commit = False)
            answer.author = request.user  ## user는 내가 안만들어도 이미 request 내에 있어서 쓸 수 있는 속성. 
            answer.create_date = timezone.now()
            answer.question = question
            answer.save()
            return redirect('{}#answer_{}'.format(resolve_url('arti:detail', question_id = question.id), answer.id))
                                                                #{변수공간}의 순서대로 써준다.
    else : 
        return HttpResponseNotAllowed("only POST method using possible")
    context = {'question' : question, 'form' : form}
    return render(request, 'article/question_detail.html', context) #(받을 리퀘스트, 리스폰스 해줄 것. 보여줄 html, 리스폰스 대상에게 전달해줄 정보.
    # question.answer_set.create(content=request.POST.get('content'),
    #                            create_date= timezone.now())
    # return redirect('arti:detail', question_id = question.id)
    




@login_required(login_url='common:login')
def answer_modify(request, answer_id):   
    answer = get_object_or_404(Answer, pk = answer_id )
    if request.user != answer.author:
        messages.error(request, "수정권한 없음")
        return redirect("arti:detail", question_id = answer.question.id)  # 받은 값이 answer에서 가져왔으니까, question.id 라고 하면 안되고, answer에 연결된 question값으로 받아야한다.
    
    if request.method =='POST':
        form = AnswerForms(request.POST, instance = answer)
        
        if form.is_valid():
            answer = form.save(commit=False)
            answer.modify_date = timezone.now()
            answer.save()
            return redirect('{}#answer_{}'.format(resolve_url('arti:detail', question_id=answer.question.id), answer.id))
        
    #### else와 return값을 이따구로 탭 넣어놓으니까 안나오지!!!!!!!!!!!!!!!!!!##############
    #### 이렇게 form이 valid한지 알아보는 조건문에 넣으면, form이 valid하지 않을때 아래를 수행하라는 뜻이잖아 ㅠㅠ 그럴일이 없잖아 ㅠㅠ 
    
        # else :
        #     form = AnswerForms(instance = answer)
        # context = {'form': form}
        # return render(request, 'article/answer_form.html', context)
        
        
    #이렇게 request.mothod가 post인지 검사하는 if 의 아래에 넣어야한다고~~
    else :
        form = AnswerForms(instance = answer)
        context = {'form': form}
    return render(request, 'article/answer_form.html', context)
    
## 오늘 시간 질질 끈거 dom 구조나 if문 등 구조적 문제가 있었다. 문법이 맞다고 다 맞는건 아니야!

    
    
    

@login_required(login_url='common:login')
def answer_delete(request, answer_id):
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.user != answer.author:
        messages.error(request,"삭제권한없음")
        return redirect("arti:detail", question_id = answer.question.id)
    answer.delete()
    return redirect('arti:detail', question_id=answer.question.id)
    
    
    
    
@login_required(login_url='common:login')    
def answer_vote(request, answer_id):
    answer = get_object_or_404(Answer, pk = answer_id) # question_id에 맞는 게시물 없으면 404 띄워라. 
    if answer.author == request.user:
        messages.error(request,"자기자신을 개추하시려구요?")
    else :
        answer.voter.add(request.user)
    return redirect('{}#answer_{}'.format(resolve_url('arti:detail', question_id=answer.question.id), answer.id))


    
