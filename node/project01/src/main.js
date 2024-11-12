import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// 1번 ) 맨 먼저 app(App.vue) 로 갑니다. // store(폴더), router(폴더) 연결 됨 

// import router from './router' 가 index.js 라우터를 가리킴. 