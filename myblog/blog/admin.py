from django.contrib import admin
from .models import Post, Category, Tag, Comment


### 우리가 만든 모델을, /admin url에서 관리할 수 있도록 등록하는 페이지.


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'tag_list', 'title', 'description', 'image', 'create_date', 'update_date', 'like') # admin 들어갔을 때 보여져야 하는 애들
    
    def tag_list(self, obj):
        return ','.join([ t.name for t in obj.tags.all()]) #리스트컴프리핸션. 리스트 내부에 넣는 반복문   
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('tags') # 상속을 받고 추가적인 메소드. 이거(prefetch)까지 해! 
        #prefatch : 미리 가져다가 fatch 해주자. 실제 모델이랑 연동되지 않고 단순한 복사본을 미리 load하여 빨리빨리 적용시킴. 
        
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'short_content', 'create_date', 'update_date')