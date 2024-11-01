from django.shortcuts import render, get_object_or_404, redirect
from ..models import Question, Test
from django.core.paginator import Paginator
from django.utils import timezone
from django.http import HttpResponse
from django.db.models import Q


    ## 더미데이터 제작
def insert(request):
    for i in range(300):
        q = Question(subject = f'테스트데이터 : {i}',
                     content = '냉무',
                     create_date = timezone.now())
        q.save()
    return HttpResponse("데이터 입력완료")


# def index(request):
#     # create_date가 최근 순서로 model에서 값을 가져와라.
#     question_list = Question.objects.order_by('-create_date')
#     paginator = Paginator(question_list, 10) # 페이지를 나눠주는 함수
#     page_obj = paginator.get_page(request.GET.get('page','1')) #GET(방식으로 보낼거다).get(이걸가져오겠다) # page=1 이 url은 우리가 보낸게 아니라 paginator함수가 보낸것. 실제 요청이 아니다. 
#     context = {"question_list" : page_obj}
#     return render(request, 'article/question_list.html', context)   # (request, html, html에게 전달할 요소.) 

def index(request):
    page = request.GET.get('page', '1')  # 페이지
    kw = request.GET.get('kw', '')  # 검색어
    question_list = Question.objects.order_by('-create_date')
    if kw:
        question_list = question_list.filter(
            Q(subject__icontains=kw) |  # 제목 검색
            Q(content__icontains=kw) |  # 질문 내용 검색
            Q(answer__content__icontains=kw) |  # 답변 내용 검색
            Q(author__username__icontains=kw) |  # 질문 작성자 검색
            Q(answer__author__username__icontains=kw)  # 답변 작성자 검색
        ).distinct()
    paginator = Paginator(question_list, 10)  # 페이지당 10개씩 보여주기
    page_obj = paginator.get_page(page)
    context = {'question_list': page_obj, 'page': page, 'kw': kw}
    return render(request, 'article/question_list.html', context)



def detail(request, question_id):
    # question = Question.objects.get(id = question_id)
    question = get_object_or_404(Question, pk = question_id)
    context = {"question" : question}
    return render(request, 'article/question_detail.html', context)


#   단순 텍스트 반환
# def index(request):
#     return HttpResponse(
#         "<h1>왜옴 .\/.</h1><br><li>몰라<li>모름."
#         )

#   html 반환
# def index(request):
#     return render(request, 'base.html')

    
def insert(request):
    Test.objects.create(name = "왜 안되냐고") # 데이터 입력 및 저장 방법 1
    
    t = Test(name = 'Django')            # 데이터 입력 및 저장 방법 2
    t.save()
    
    return HttpResponse("데이터입력완료")





def show(request):
    display_all = Test.objects.all()
    result = ""
    
    for t in display_all :
        result += "<h1>" + t.name + "</h1>" + "<br>"
    return HttpResponse(result)
