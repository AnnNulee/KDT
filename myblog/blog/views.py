from django.shortcuts import render
from .models import Post, Category, Tag, Comment
from django.views.generic import DetailView, TemplateView

class PostDV(TemplateView):
    template_name = 'blog/post_detail.html' #우리가 렌더링 할게 여기있다. templates 폴더가 이미 basedir로 설정되었기 때문에 templates-blog-post_detail.html 순으로 찾는다.
    