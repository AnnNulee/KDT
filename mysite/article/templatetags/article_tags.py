import markdown
from django import template
from django.utils.safestring import mark_safe


## 게시물 값으로 만들거임

register = template.Library()


# @ : 파이선 문법중 데코레이션(시스템에 접근). filter는 템플릿 필터. 여기에 내가 만든 함수를 추가하겠다. 마치 템플릿 필터 속 바 함수 안에 있는 add가 있듯. 
@register.filter
def sub(value, arg):
    return value - arg

@register.filter
def mark(value):
    extensions = ['nl2br', 'fenced_code']
    return mark_safe(markdown.markdown(value, extensions=extensions))
