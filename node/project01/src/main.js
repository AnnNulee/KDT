import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PageTitle from './components/flagment/PageTitle.vue'

//createApp(App).use(store).use(router).mount('#app').component(PageTitle)



const app = createApp(App)
app.use(store)
app.use(router)
app.component('PageTitle', PageTitle)
/// 활용할 컴포넌트를 이렇게 적용할 수 있다. 
// 이걸 해놓으면 컴포넌츠 활용할 때, 해당 컴포넌트 파일에서 import를 따로 하지 않아도 된다. 
app.mount('#app')


// 1번 ) 맨 먼저 app(App.vue) 로 갑니다. // store(폴더), router(폴더) 연결 됨 
// import router from './router' 가 index.js 라우터를 가리킴. 


// '.' (현재 해당 파일이 있는 폴더) 은 상대경로 : 파일 위치가 이동되면 다 바꿔줘야한다.
// '@' (src) 은 절대경로.  를 뜻한다. 안정적. 파일 위치가 바뀌던 말던