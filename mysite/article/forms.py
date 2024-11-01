from django import forms
from .models import Question, Answer

class QuestionForms(forms.ModelForm): # 클래스 상속받음
    class Meta : #이너 클래스 재정의
        model = Question #사용할 모델
        fields = ['subject', 'content'] #사용자에게 입력받을 속성
        widgets = {
            'subject' : forms.TextInput(attrs={'class': 'form-control'}), ## textinput이 이미 잡힌다. css를 적용하기 위해 class 이름을 'form-control'로 잡아준다.
            'content' : forms.Textarea(attrs={'class':'form-control', 'rows':10}),
        }
        labels = {
            'subject' : '제목여기다가한번 써봐',
            'content' : '내용은 여기다 써봐'
        }
        
class AnswerForms(forms.ModelForm):
    class Meta :
        model = Answer
        fields = ['content']
        labels = { 'content' : '댓글 써봐'}