# from .base_views import *
# from .question_views import *
# from .answer_views import *


# ## python은 어떤 폴더를 받을 때, init 에 가장 먼저 접근.
# # __init__ 파일이 하위 views파일을 다 인식시켜줌
# # init 파일을 해당 상위폴더를 파일처럼 인식하게함????
# # 파일을 폴더형식으로 만들겠다. 근데 어떤 파일을 인식하게 해야하나? 메타정보를 제공해야함. 그게 __init__.  


# 하지만 init 에 *로 다 불러와버리면 urls 에서 경로가 모두 views로 처리되므로 어떤 views 파일에서 찾아야할지 헷갈린다.
# 그래서 from으로 뷰즈까지 다 불러와놓고 import에서 각 파일을 모두 로드 해주면 init 파일이 필요없게된다####