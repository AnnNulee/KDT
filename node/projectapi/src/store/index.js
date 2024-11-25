import { createStore } from 'vuex'

export default createStore({
  state: {
    user : {},
  },
  getters: {
    user : (state) => state.user,
  },
  mutations: {
    setUser(state, userInfo){   // 유저정보가 들어오면 state에 정보 넣어줌
      state.user = userInfo;
    },
    clearUser(state){  // 유저가 로그아웃하면 state에 정보 빼줌
      state.user = {}
    }
  },
  actions: {
    setUser({ commit }, userInfo){
      commit("setUser", userInfo);
    },
    clearUser({ commit }){
      commit("clearUser");
    },
  },
  modules: {
  }
})



