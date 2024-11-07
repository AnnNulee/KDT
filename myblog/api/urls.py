from django.urls import path
from . import views


## 쿼리는 url정의 안함.조회할 때 get요청을 주는데, 필요한 값을 요청하는데 그 조건에 대해 알려줄 때 쿼리를 짜서 보내주는 것.


app_name = 'api'

urlpatterns = [
    path('post/list/', views.ApiPostLV.as_view(), name='post_list'),
    path('post/<int:pk>/', views.ApiPostDV.as_view(), name='post_detail'),
    path('catetag/', views.ApiCateTag.as_view(), name='catetag_list'),
    path('like/<int:pk>', views.ApiPostLikeDV.as_view(), name='post_like'),
    path('comment/create/', views.ApiCommentCV.as_view(), name='comment-create'),
]

