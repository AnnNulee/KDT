

export const todoName = {  // export const에서 전체 모듈의 이름을 정해준다.

namespaced: true, // const에서 정한 이름을 index에서 import 할 수 있다.
    
state() {      // 데이터를 저장하는 공간. 저장소.  전역 data. // state를 함수형식으로 정하면 return을 object 형식으로 받는다. 그럼 키값으로 바로 부를 수 있다. 내부 데이터를 부를 때 접근하기가 쉽다.
   
    return {      /// !!!!!!!!!!!!!컴포넌트에서 불러올때는 computed에서 함수로 정의하여 가져온다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      todoState: [
        {id:1, title:'할일 1', done:true},
        {id:2, title:'할일 2', done:false},
        {id:3, title:'할일 3', done:false},
      ]
    }
  },

  getters: {    // state데이터의 computed를 정의하는 공간.  views에서 불러올때는 함수형식으로 불러와지기 때문에 값의 변형이 불가하다. 그냥 getters에서는 가능임
    todosCount(state) {
      return state.todoState.length    ///length는 값의 개수를 세준다.
    },
    doneTodosCount(state) {
      return state.todoState.filter((todo) => todo.done ).length   
    },
    notDoneTodosCount(state) {
      return state.todoState.filter((todo) => !todo.done ).length
    }
  },

  mutations: {  // state의 데이터 값을 수정할 수 있는 함수가 정의되는 공간. // 컴포넌트에서 state 값을 변경하고싶다면 mutations에 함수를 정의해야한다. // 다른 함수들을 다 적용 가능하게 하면 공용 데이터의 일관성이 해쳐진다. 
    add(state, item) {
      state.todoState.push(item)    //배열로 되어있으니 push.
    },
    remove(state, id) {
      state.todoState = state.todoState.filter((todo) => todo.id !== id)   // 해당 id만 제외하고 보여주는 방식으로 '삭제' 실행
    },
    doneYN(state, doneState) {
      state.todoState.filter((todo) => todo.id === doneState.id)[0].done = doneState.done
    },
  },

  actions: {    // mutations가 적용되어있는 메서드를 커밋을 통해서 실행할 때. commit은 실행 명령어. 비비동기처리. 
    // context.commit : 데이터 커밋, context.state : 데이터 불러오기
    add({ commit }, item) {
      commit('add', item)
    }
  },

}

