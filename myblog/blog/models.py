from django.db import models


#게시글을 저장할 모델(db)
class Post(models.Model):
    # foreign key
    # foreignkey는 1대 n 관계, 'n'쪽에 적용해주는 키. 
    # 게시물당 카테고리는 하나. 카테고리 하나에는 여러 게시물
    category = models.ForeignKey('Category', blank=True, null=True, on_delete=models.SET_NULL) #(FK,NT, BT, SN) foreign key, null true, blank true, set null
                                 # category 모델은 아직 정의되지 않았다. 하지만 '문자열'로 참조해놓으면 클래스의 순서에 상관없이 해당 테이블을 참조할 수 있다.
    # set null : category 가 삭제되면 그냥 null 줘라
    # category 모델에서 post를 부르는 방식은 안된다. 고유값이 아니라 여러가지 게시물에 적용되었기 때문에.

    #게시물당 테그 여러개. 테그 하나에도 여러 게시물.
    tags = models.ManyToManyField('Tag', blank=True) #(MM, BT) many to many, blank true
        
    title =models.CharField('TITLE', max_length=50) #(Char, NN, ML=50) not null, max length = 50
    #title(변수이름)=~('TITLE'(실제 모델에 적용되는 컬럼이름), max_~)
    
    
    description = models.CharField('DESCRIPTION', max_length = 100, blank=True, help_text='simple one-line-text') #(Char, NN, ML=100)
    
    # 빈칸과 null값을 허용한다. 디폴트는 금지임. false.
    image = models.ImageField('IMAGE', upload_to='blog/%Y/%m', blank=True, null=True) #(Img, BT, NT)
    content = models.TextField('CONTENT') #(Text, NN)
    create_date = models.DateTimeField("CREATE DT", auto_now_add=True) # 새로만듦 #(DT, NN, ANA) auto now add
    update_date = models.DateTimeField("UPDATE DT", auto_now=True) # 수정 들어감. 업데이트가 될 때마다 시간을 바꿔주려고 #(DT, AN) auto now / 내가 넣어주어야 하는 것이 아니기때문에, null인지 아닌지 중요치 않다. 
    like = models.PositiveIntegerField('LIKE', default = 0) #(INT, df=0 )
    
    
    def __str__(self):
        return self.title


#게시글의 종류를 지정.
class Category(models.Model):
    name = models.CharField(max_length=50, unique=True) # unique true, 같은 값 불가. 중복 불가!  #(ML=50, UQ)
    description = models.CharField('DESCRIPTION', max_length=50, blank = True, help_text = 'simple one-line-text') #(ML=100,BT)
    
    def __str__(self):
        return self.name



#게시글의 해시태그
class Tag(models.Model):
    name = models.CharField(max_length=50) # 얘는 unique true 하면 안된다... 왜?! 이해안가!!!!!!
    
    def __str__(self):
        return self.name

 
# 댓글
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE) #(FK, NN,CS)
                            # 위에 이미 정의된 모델을 참조할때는 문자열 말고 바로 참조 가능 
    
    content = models.TextField('CONTENT') #(Text, NN)
    create_date = models.DateTimeField('CREATE DT', auto_now_add=True) #(DT,NN,ANA)
    update_date = models.DateTimeField('UPDATE DT', auto_now=True) #(DT, AN)
    
    @property
    def short_content(self):
        return self.content[:10]
    
    def __str__(self):
        return self.short_content    
    