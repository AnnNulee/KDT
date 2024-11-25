import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useKakao } from 'vue3-kakao-maps/@utils';



createApp(App).use(store).use(router).mount('#app')
useKakao('38704b2752e5900f74ea3b9c385e003c');
