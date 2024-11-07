from django.shortcuts import render

## vue를 위한 restful api 를 사용해야하는데, 이때 jason을 사용한다. (확인 필요)

from django.http import JsonResponse
from django.views.generic.list import BaseListView
from django.views.generic.detail import BaseDetailView
from django.views.generic.edit import BaseCreateView
from django.views import View

from blog.models import Post, Category, Tag, Comment # Post 모델을 명시적으로 가져옵니다.
from api.utils import obj_to_post, prev_next_post, obj_to_comment


class ApiPostLV(BaseListView):
    # model = Post  
    ## Post 모델 설정을 했지만, 아래에 있는 get_queryset 함수가 따로 post를 끌고와서 필요한 값을 정의하면서 모델을 굳이 쓸 필요없어짐

    ## list_vue에서 보내주는 쿼리문을 받을 수 있도록 설정
    def get_queryset(self):
        paramCate = self.request.GET.get('category')
        paramTag = self.request.GET.get('tag')

        if paramCate:
            qs = Post.objects.filter(category__name__iexact = paramCate) 
            ## 포스트에서 가져온 오브젝중에서, 필터 적용해서 가져오겠다. 포스트 컬럼 이름인 category의 name을 추출해서 거기서 같은 애들만 가져오겠다.   
        elif paramTag:
            qs = Post.objects.filter(tags__name__iexact = paramTag)
        else :
            qs = Post.objects.all()
        return qs
    
    
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
        post = obj_to_post(obj) #utils # response 형식으로 적합한 딕셔너리 형태로 만든다. 
        prevPost, nextPost = prev_next_post(obj) #utils # 데이터를 기준으로 앞의, 뒤의 모델 데이터를 id와 타이틀만 가져오겠다.
        
        #comment는 여러개니까 여러개 뽑아주는 반복문으로 리스트 내부에 세팅
        commentqs = obj.comment_set.all()  ##이렇게 하면 post로 연결된 forienkey의 속성을 가져올 수 있다. 
        commentList = [obj_to_comment(obj) for obj in commentqs] ##obj_to_comment 함수는 다시 util에서 별도로 정의해주자.
        
        jsonData = {   ### 파이썬은 제이슨 형식이 없어서 dict 형식으로 만든 후에, 이 dict형식을 jason으로 보내준다.
            'post' : post,
            'prevPost' : prevPost,
            'nextPost' : nextPost,
            'commentList' : commentList,
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
        # category와 tag를 모두 가져와서
        
        # category의 이름과 tag의 이름을 뽑아 리스트 형식으로 묶어준다.
        cateList = [cate.name for cate in qs1]
        tagList = [tag.name for tag in qs2 ]
        
        jsonData = {
            'cateList' : cateList,
            'tagList' : tagList,
        }
        
        return JsonResponse(data=jsonData, safe=True, status=200)
    
    
    
    ## 여기서 like값을 1 올려준다.
class ApiPostLikeDV(BaseDetailView):
    model = Post
    
    def render_to_response(self, context, **response_kwargs):
        obj = context['object']
        obj.like += 1
        obj.save()
        return JsonResponse(data=obj.like, safe=False, status=200) 
    
    
    
#     ## 여기서 axios.post로 받은 comment 를 comment모델에 저장해준다.
# class ApiCommentCV(BaseCreateView): # 상속받음
#     model = Comment
#     fields = '__all__' # 모든 필드(속성)을 모두 사용.
    
#     def form_valid(self, form): #폼이 정상적으로 들어왔을 경우
#         self.object = form.save() # 폼 저장
        
#         # save 한 내용을 다시 댓글창에 보여줌
#         # 시리얼라이즈 적용하여 다시 가져옴.  
#         comment = obj_to_comment(self.object) 
#         return JsonResponse(data=comment, safe=True, status=200)
    
#     def form_invalid(self, form): #폼이 비정상적으로 들어왔을 경우 (csrf토큰 없을 경우)
#         print(form.errors)
#         return JsonResponse(data = form.errors, safe = True, status = 400)
    
    
class ApiCommentCV(BaseCreateView):
    model = Comment
    fields = '__all__'

    def form_valid(self, form):
        self.object = form.save()
        comment = obj_to_comment(self.object)
        return JsonResponse(data=comment, safe=True, status=201)

    def form_invalid(self, form):
        print(form.errors)
        return JsonResponse(data=form.errors, safe=True, status=400)
    