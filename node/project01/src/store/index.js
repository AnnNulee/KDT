import { createStore } from 'vuex'

///전역으로 쓸것들을 관리하는 곳
// 중앙에서 데이터를 관리하기 위한 곳.
// 데이터의 변경사항도 추적하고 (computed)
// 데이터를 변경시켜주기도 하고
// 데이터에 대한 비동기 처리를 하기도 하고

export default createStore({
  state: {      // 전역 data. 
  },
  getters: {    // getter는 computed가 전역화된 느낌. computed는 추적이 가능하니까
  },
  mutations: {  // state에서 사용할 수 있는 함수들을 설정해놓음. 직접적인 변경 가능  // 다른 함수들을 다 적용 가능하게 하면 공용 데이터의 일관성이 해쳐진다. 
  },
  actions: {    // state이랑 비슷한데, 간접적인 변경 가능. mutations가 적용되어있는 것들을 commit해준다.  비동기처리. 
  },
  modules: {    // 
  }
})
