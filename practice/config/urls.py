from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('article.urls')),
    path('admin/', admin.site.urls),
    path('article/', include('article.urls')) ## include로 article.urls 안에 정의된 url 경로, 즉 url패턴으로 경로가 전달된다.
]
