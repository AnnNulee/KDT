import { createStore } from 'vuex'
// 중앙 저장소
// 모든 컴포넌트에서 사용할 수 있도록 데이터를 관리해주는 라이브러리


///전역으로 쓸것들을 관리하는 곳
// 중앙에서 데이터를 관리하기 위한 곳.
// 데이터의 변경사항도 추적하고 (computed)
// 데이터를 변경시켜주기도 하고
// 데이터에 대한 비동기 처리를 하기도 하고

// db랑 state은 다른 공간임!!
// state데이터는 서버 DB에 있는 데이터와 자동 동기화되지 않는다. 일단 불러오는거임. 
// 일단 DB에서 데이터를 받아와서 state에 저장(대입)한다.  
// state을 변형하는 기능은 mutation에 있고, state에 있는 데이터를 db로 쏴주는 기능은 비동기로 처리하는데, 
// actions에서는 mutation으로 state를 변경하고 비동기처리(axios)등으로 db에 접근하여 정보를 변경하는 역할을 한다. 


// '항상 유지되는' 데이터 등
// main에 import 되어있기 때문에 모든 컴포넌트에서 사용 가능

export default createStore({
  state() {      // 데이터를 저장하는 공간. 저장소.  전역 data. // state를 함수형식으로 정하면 return을 object 형식으로 받는다. 그럼 키값으로 바로 부를 수 있다. 내부 데이터를 부를 때 접근하기가 쉽다.
   
    return {      /// !!!!!!!!!!!!!컴포넌트에서 불러올때는 computed에서 함수로 정의하여 가져온다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      todos: [
        {id:1, title:'할일 1', done:true},
        {id:2, title:'할일 2', done:false},
        {id:3, title:'할일 3', done:false},
      ]
    }
  },

  getters: {    // state데이터의 computed를 정의하는 공간.  views에서 불러올때는 함수형식으로 불러와지기 때문에 값의 변형이 불가하다. 그냥 getters에서는 가능임
    todosCount(state) {
      return state.todos.length    ///length는 값의 개수를 세준다.
    },
    doneTodosCount(state) {
      return state.todos.filter((todo) => todo.done ).length   
    },
    notDoneTodosCount(state) {
      return state.todos.filter((todo) => !todo.done ).length
    }
  },

  mutations: {  // state의 데이터 값을 수정할 수 있는 함수가 정의되는 공간. // 컴포넌트에서 state 값을 변경하고싶다면 mutations에 함수를 정의해야한다. // 다른 함수들을 다 적용 가능하게 하면 공용 데이터의 일관성이 해쳐진다. 
    add(state, item) {
      state.todos.push(item)    //배열로 되어있으니 push.
    },
    remove(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id)   // 해당 id만 제외하고 보여주는 방식으로 '삭제' 실행
    },
    doneYN(state, doneState) {
      state.todos.filter((todo) => todo.id === doneState.id)[0].done = doneState.done
    },
  },

  actions: {    // mutations가 적용되어있는 메서드를 커밋을 통해서 실행할 때. commit은 실행 명령어. 비비동기처리. 
    // context.commit : 데이터 커밋, context.state : 데이터 불러오기
    add({ commit }, item) {
      commit('add', item)
    }
  },
  modules: {    // 복잡한 state와 method들을 분리하여 사용할 수 있도록 만들어줌
  }
})


