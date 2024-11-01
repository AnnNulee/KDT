from django.urls import path
from . import views

app_name = "arti"

urlpatterns = [
    path("", views.index, name = "index" ),## article.views에서 함수 끌어와서 적용
    path("insert", views.insert),
    path("<int:quetion_id>", views.detail, name="detail"),
]