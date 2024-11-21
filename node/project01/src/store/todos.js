import VueCookies from 'vue-cookies'
/// cookies는 시간만 설정할 수 있다. 


// 모듈.
// vuex를 모듈화 하여 목적별로 관리. 
// 해당 모듈파일을 store.index에 import 하여 연결한다. 






export const todoName = {  // export const에서 전체 모듈의 이름을 정해준다.

namespaced: true, // const에서 정한 이름을 index에서 import 할 수 있다.

  // db랑 state은 다른 공간임!!
  // state데이터는 서버 DB에 있는 데이터와 자동 동기화되지 않는다. 일단 불러오는거임. 
  // 일단 DB에서 데이터를 받아와서 state에 저장(대입)한다.  
  // state을 변형하는 기능은 mutation에 있고, state에 있는 데이터를 db로 쏴주는 기능은 비동기로 처리하는데, 
  // actions에서는 mutation으로 state를 변경하고 비동기처리(axios)등으로 db에 접근하여 정보를 변경하는 역할을 한다. 
    
state() {      
  // 라이프 사이클을 시작할때 DOM 구성시 해당 데이터를 불러와 렌더링한다. 
  // 원래 state data는 브라우저 내의 lifecycle을 따라가기 때문에 새로고침 하면 리셋 된다. 
  // 이 상황에서는 mutation을 적용하던 action 을 적용하던 실제 state의 데이터에는 

  // 데이터를 저장하는 공간. 저장소.  전역 data. 
  // state를 함수형식으로 정하는 이유 : return을 object 형식으로 받는다. 그럼 키값으로 바로 부를 수 있다. 내부 데이터를 부를 때 접근하기가 쉽다.

    return {      /// !!!!!!!!!!!!!컴포넌트에서 불러올때는 computed에서 함수로 정의하여 가져온다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      todoState: [
        {id:1, title:'할일 1', done:true},
        {id:2, title:'할일 2', done:false},
        {id:3, title:'할일 3', done:false},
      ],
      userInfo: {
        name : '신누리',
        email : '업써요',
      },
    }
  },

  getters: {    
    // state 데이터의 computed를 정의하는 공간.  
    // state 데이터는 ""컴포넌트 내부에서 computed에서 함수형식""으로 불러와지기 때문에, 값의 변형이 불가하다. 
    // 때문에 getters에서 따로 변형시켜준다.
    todosCount(state) {
      return state.todoState.length    ///length는 값의 개수를 세준다.
    },
    doneTodosCount(state) {
      return state.todoState.filter((todo) => todo.done ).length   
    },
    notDoneTodosCount(state) {
      return state.todoState.filter((todo) => !todo.done ).length
    },
    isLogin() {
      if (VueCookies.get('cookieName')){   /// cookie 중 이름이 'cookieName'인게 있으면, 실행
        return true
      } else {
        return false
      }
    },
  },

  mutations: {  
    // state의 데이터 값을 수정할 수 있는 함수가 정의되는 공간. 
    // 컴포넌트에서 state 값을 변경하고싶다면 mutations에 함수를 정의해야한다.
    // 다른 함수들을 다 적용 가능하게 하면 공용 데이터의 일관성이 해쳐진다. 
    add(state, item) {
      state.todoState.push(item)    //배열로 되어있으니 push.
    },
    remove(state, id) {
      // 해당 id만 제외하고 보여주는 방식으로 '삭제' 실행
      state.todoState = state.todoState.filter((todo) => todo.id !== id)   
    },
    doneYN(state, doneState) {
      state.todoState.filter((todo) => todo.id === doneState.id)[0].done = doneState.done
    },
    removeAll(state){
      state.todoState = []
    },
    setUserInfo(state){
      console.log(state.userInfo)
      VueCookies.set('cookieName', state.userInfo, '30s') // (2번 변수)데이터를 (1번 변수)로 부를거고, (3번변수)만큼 유지한다.
    },
  },

  

  actions: {    // mutations가 적용되어있는 메서드를 커밋을 통해서 실행할 때. commit은 실행 명령어. 비비동기처리. 
    // context.commit : 데이터 커밋, context.state : 데이터 불러오기
    add({ commit }, item) {
      commit('add', item)
    },
  },

}

