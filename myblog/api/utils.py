

def obj_to_post(obj, flag=True):  #어떤 obj를 하나 받으면, 그것에 있는 모든것을 적합한 형태 (dict)로 만들어 
    """
    obj 의 각 속성을 serialize 해서, dict 로 변환한다.
    serialize: python object --> (기본 타입) int, float, str
    :param obj:
    :param flag: True (모두 보냄, /api/post/99/ 용), False (일부 보냄, /api/post/list/ 용)
    :return:
    """
    post = dict(vars(obj))
    
    if obj.category: # 이 안에 카테고리라는게 있으면 
        post['category'] = obj.category.name # 그것을 카테고리의 이름을 'category'키에 해당하는 값으로 준다.
    else:
        post['category'] = 'NoCategory' #없으면 이 값을 준다.

    if obj.tags:
        post['tags'] = [t.name for t in obj.tags.all()]
    else:
        post['tags'] = []

    if obj.image:
        post['image'] = obj.image.url
    else:
        post['image'] = 'https://via.placeholder.com/900x300/'

    if obj.update_date:
        post['update_date'] = obj.update_date.strftime('%Y-%m-%d %H:%M:%S')
    else:
        post['update_date'] = '9999-12-31 00:00:00'

    del post['_state'], post['category_id'], post['create_date']

    return post # 결과값은 딕셔너리 하나



## obj : views에서 context (장고가 가진 BaseDetailView에서 설정되는 인스턴스 딕셔너리 변수) 를 받은 변수. 

def prev_next_post(obj) : 
    try : #예외처리구문. 이전, 이후게시글이 없을 때를 대비
        prevObj = obj.get_previous_by_update_date()   ## 모델 함수. get_previous_by_() : ()의 기준의 순서로 앞서있는 모델 데이터를 가져오겠다. 
        prevDict = {
            'id': prevObj.id,
            'title': prevObj.title
        }
    except obj.DoesNotExist: # doesnotexist : 예외구문이 가지고있는 속성중 하나
        prevDict = {}

    try : #예외처리구문. 이전, 이후게시글이 없을 때를 대비
        nextObj = obj.get_next_by_update_date()   ## 모델 함수. get_previous_by_() : ()의 기준의 순서로 앞서있는 모델 데이터를 가져오겠다. 
        nextDict = {
            'id': nextObj.id,
            'title': nextObj.title
        }
    except obj.DoesNotExist: # doesnotexist : 예외구문이 가지고있는 속성중 하나
        nextDict = {}
        
    return prevDict, nextDict