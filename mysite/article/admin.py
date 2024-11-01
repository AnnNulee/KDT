from django.contrib import admin

# Register your models here.
from .models import Question
from .models import Question, Answer, Test


class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['subject']
admin.site.register(Question, QuestionAdmin)

class AnswerAdmin(admin.ModelAdmin) : 
    search_fields = ['subject']
admin.site.register(Answer, AnswerAdmin)

class TestAdmin(admin.ModelAdmin) :
    search_fields = ['name']
admin.site.register(Test, TestAdmin)