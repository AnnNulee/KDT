

// vuex ㅣ 
// vuex의 index
// 모듈을 import하여 관리할 수 있다.

import { createStore } from 'vuex'
import { todoName } from './todos'  // todos에서 export const로 정의한 이름을 그대로 import 해줘야함. 
import persistedstate from 'vuex-persistedstate'






export default createStore({
  modules: {    // 복잡한 state와 method들을 분리하여 사용할 수 있도록 만들어줌
    todoModules : todoName    /// todos.js 를 todoName이라고 부르는데, 그걸 사용하는 모듈명으로는 todoModules라고 주겠다.
  },

  plugins : [persistedstate({paths: ['todoModules.todoState']})] ,
  // 라이프 사이클을 시작할때 DOM 구성시 해당 데이터로 초기화 한다. 
  // 원래 state data는 브라우저 내의 lifecycle을 따라가기 때문에 새로고침 하면 리셋 된다. 
  // state Data는 Dom 구성시 lifeLocal storage에 저장되고 그 데이터를 기반으로 브라우저에 표기된다. 

  // Persistedstate//
  // 해당 플러그인을 렌더링할 데이터를 local starage로 불러오게 한다. 
  // 때문에 life cycle과 별개로, 새로고침했을 때도 영구히유지 되길 바라면 persistedstate 플러그인를 먹여준다.

  // Local Storage// 프론트에서 데이터를 저장 하는 법
  // local storage는 브라우저 내부 자체 저장소이다.
  // 도메인마다 local storage를 하나씩 쓰고있다. local storage 에 저장된 것은 따로 삭제 하지 않는 이상 브라우저에 영구저장된다.
  // 저장은 내 브라우저 내의 local storage에 저장되고, 구분은 도메인별로 해서 도메인에 들어갔을 때 나의 브라우져 내에 저장된 local storage data 가 나오게 된다. 

  // 일정 기간(내가 정함) 유지 후 삭제되어야 하는 data 는 cookie에 저장할 수 있다.

})



