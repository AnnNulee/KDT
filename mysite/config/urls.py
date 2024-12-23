
from django.contrib import admin
from django.urls import path, include
from article.views import base_views, answer_views, question_views


urlpatterns = [
    path("", base_views.index , name = "index"),
    path('admin/', admin.site.urls),
    path('article/', include('article.urls')),
    path('common/', include('common.urls')),

]
