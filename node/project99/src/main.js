import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'



const app = createApp(App)
app.use(store)
app.use(router)


/// 활용할 컴포넌트를 이렇게 적용할 수 있다. 
// 이걸 해놓으면 컴포넌츠 활용할 때, 해당 컴포넌트 파일에서 import를 따로 하지 않아도 된다. 
app.mount('#app')
