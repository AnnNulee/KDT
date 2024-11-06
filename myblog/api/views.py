from django.shortcuts import render

## vue를 위한 restful api 를 사용해야하는데, 이때 jason을 사용한다. (확인 필요)

from django.http import JsonResponse
from django.views.generic.list import BaseListView
from django.views.generic.detail import BaseDetailView
from django.views import View

from blog.models import Post, Category, Tag  # Post 모델을 명시적으로 가져옵니다.
from api.utils import obj_to_post, prev_next_post


class ApiPostLV(BaseListView):
    model = Post  # Post 모델 설정

    def render_to_response(self, context, **response_kwargs): ## 이 함수는 본래 부모클래스에 존재하는것을 오버라이딩 하는 것.
        qs = context['object_list']
        postList = [obj_to_post(obj, False) for obj in qs]
        return JsonResponse(data=postList, safe=False, status=200)



# 포스트 하나만 받을 때.

# class ApiPostDV(BaseDetailView):
#     model = Post
    
#     def render_to_response(self, context, **response_kwargs):
#         obj = context['object']  ##괄호 아니고 대괄호. 리스트 형태로 들어와준다. 
#         post = obj_to_post(obj)
#         return JsonResponse(data=post, safe=True, status=200) #dict일때는 safe를 True로
    
    
class ApiPostDV(BaseDetailView):
    model = Post
    
    def render_to_response(self, context, **response_kwargs):
        obj = context['object']  ##괄호 아니고 대괄호. 리스트 형태로 들어와준다.  
        ## BaseDetailView에서 자동으로 context 딕셔너리를 생성(내가 만드는거 아님)하고, 이 안에 object라는 키를 포함하여 해당 모델의 인스턴스를 담는다.
        post = obj_to_post(obj) #utils에서 정의해줄(정의된) 함수
        prevPost, nextPost = prev_next_post(obj) ## utils에서 정의해줄(정의된) 함수
        
        jsonData = {   ### 파이썬은 제이슨 형식이 없어서 dict 형식으로 만든 후에, 이 dict형식을 jason으로 보내준다.
            'post' : post,
            'prevPost' : prevPost,
            'nextPost' : nextPost,
        }
        
        return JsonResponse(data=jsonData, safe=True, status=200) #dict일때는 safe를 True로
    
                ##JsonResponse는 Django 클래스 중 하나
                # HTTP 응답을 JSON 형식으로 반환하려고 할 때 사용.
                # HttpResponse를 상속받으며, 자동으로 딕셔너리 데이터(dict)를 JSON 형식으로 변환하고 적절한 Content-Type 헤더를 설정해줌.
                        #전달할 jason의 data변수에는 위에서 정의해준 jsonData를 넣어줘야한다. 
         ## JsonResponse은 res가 객체를 잘 받게 하기위한 역할. data=jsonData 를 보내준다. 
        
        
class ApiCateTag(View):
    def get(self, request, *args, **kwargs):
        qs1 = Category.objects.all()
        qs2 = Tag.objects.all()
        cateList = [cate.name for cate in qs1]
        tagList = [tag.name for tag in qs2 ]
        
        jsonData = {
            'cateList' : cateList,
            'tagList' : tagList,
        }
        
        return JsonResponse(data=jsonData, safe=True, status=200)