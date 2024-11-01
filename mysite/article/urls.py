from django.urls import path
from .views import base_views, answer_views, question_views

app_name = 'arti'

urlpatterns = [
    path("", base_views.index, name = 'index'), # 기본화면. 등록된 게시글(질문) 리스트목록
    path("<int:question_id>", base_views.detail, name = 'detail'), # 게시글(질문글) 내용.  ## 여기서 a는 변수명이다. 받은 int값에 대한 변수명
    ## index함수가 실행되면, 질문데이터를 나열하고 페이지 번호를 정해준다. 그리고 실제 요청이 아닌 함수 내에서 페이지 번호에 따른 임시?요청을 보내준다. 이게 여기서 받는 int
    
    path("question/create/", question_views.question_create, name = 'question_create'), ## '질문등록' = > 글 작성공간 (html) // '질문 저장'
    path("question/modify/<int:question_id>/", question_views.question_modify, name = 'question_modify'), # url에 그냥 modify만 설정하는게 아니라, 각 수정기능마다 각 url의 기능이 있어야 하는 법.   
    path("question/delete/<int:question_id>/", question_views.question_delete, name = 'question_delete'),
    path("question/vote/<int:question_id>/", question_views.question_vote, name = 'question_vote'),
    
    path('answer/create/<int:question_id>/', answer_views.answer_create, name = 'answer_create'), # 답변 등록 + 답변 
    path('answer/modify/<int:answer_id>/', answer_views.answer_modify, name = 'answer_modify'),
    path('answer/delete/<int:answer_id>/', answer_views.answer_delete, name = 'answer_delete'),
    path('answer/vote/<int:answer_id>/', answer_views.answer_vote, name = 'answer_vote'),

    path("insert/", base_views.insert)
    # path("show/", base_views.show)

]

