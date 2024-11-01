from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    subject = models.CharField(max_length=200)
    content = models.TextField()         # Field는 속성. 데이터 베이스, 테이블의 열.  
    create_date = models.DateTimeField() # create_date라는 열(속성)을 만들고, DateTimeField 함수(데이터 타입을 정해줌) 적용.
    modify_date = models.DateTimeField(null = True, blank = True) # create_date는 언제나 들어가는데, modify는 수정할때만 들어간다. 그러니 빈 값을 허용해야 함. 
                                                                  # blank 는 form is valid 검사할 때, 빈칸이어도 허용한다는 뜻. 
    author = models.ForeignKey(User, on_delete= models.CASCADE, null=True, related_name='author_question' ) #계정이 삭제되면, 게시글도 삭제하라.  #null=True : null값을 허용하겠다.
    voter = models.ManyToManyField(User, related_name = 'voter_question')
    ##데이터베이스 연계에는 관계설정이 필요핟. (m to m, one to m 등)

    def __str__(self):
        return self.subject

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE )
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField( null = True, blank =True )
    author = models.ForeignKey(User, on_delete= models.CASCADE, null=True, related_name = 'author_answer' )
    voter = models.ManyToManyField(User, related_name = 'voter_answer')

    def __str__(self):
        return self.content[:20]  # 내용의 첫 20자만 표시
    
    
class Test(models.Model):
    name = models.CharField(max_length=200)