import { createStore } from 'vuex'
import { todoName } from './todos'  // todos에서 export const로 정의한 이름을 그대로 import 해줘야함. 

export default createStore({
  modules: {    // 복잡한 state와 method들을 분리하여 사용할 수 있도록 만들어줌
    todoModules : todoName    /// todos.js 를 todoName이라고 부르는데, 그걸 사용하는 모듈명으로는 todoModules라고 주겠다.
  }
})


