import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [  
  { /// 이전) main.js-App.vue - 라우터링크(router-index.js)   3) 여기서는 path주소, 컴포넌트가 될 뷰가 정의되어있다. homeView로 가자!!! 
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')  // 동작이 실제로 실행할때 청크를 불러온다. 
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ '../views/AboutView.vue') 
                                                       // webpackPrefetch:true 하면 home이 불러와질때 about도 같이 불러와서 대기시킴. 
  },
  {
    path : '/test',
    name : 'TEST',
    component : () => import(/* webpackChunkName: "TEST", webpackPrefetch:true */ '../views/TestView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
