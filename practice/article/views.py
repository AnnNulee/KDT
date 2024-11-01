from django.shortcuts import render
from .models import Question
from django.utils import timezone
from django.http import HttpResponse

# Create your views here.

def index(request): #도메인 들어가면, Question 모델 가져와서 question_list.html 에 적용.  
    
    # 생성된 날짜의 역순으로 정렬한 Question모델의 객체(쿼리셋 자료형)를 'question_list'변수에 저장
    question_list = Question.objects.order_by('-create_date')
    context = {'question' : question_list}
    # html 파일에 데이터(dict형태)를 결합하여 화면에 보여준다.
    return render(request, 'article/question_list.html', context)


def insert(request):
    #500번 반복한다.
    for i in range(500): 
        # Question moedel을 상속받아 그 안에 제목, 내용, 일자를 채운 'dataset'을 생성)
        # 하지만 model을 보면 self함수를 쓰지않아 instance가 생성되는게 아니라, Question model에 직접 저장됨 
        dataset = Question(subject = f'테스트데이터_{i}',
                        content = '냉무',
                        create_date = timezone.now())
        #해당 변경사항을 데이터베이스에 저장
        dataset.save()
    return HttpResponse("입력완")



def detail(request, question_id):
    
    # url에서 정의한 int의 변수인 question_id를 ""(FACTCHECK) 모델 id로 받아 Question 요소를 받아온다.""
    # pk : primary key. Question 모델에서 ""(FACKCHECK)자동 생성되는 primary key 를 question_id로 정의한다."" 
    question = Question.object.get_object_or_404(request, pk = question_id)


    

    #### 추가진행 #### 
    return render(request, "arti:detail", question_id = question.id)