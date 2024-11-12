import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


// 라우터 에 대한 모든 정보. path 정의, 이름 정의, 불러올 component 정의. 


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
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')  // 동작이 실행할때 청크를 불러온다. 
    component: () => import(/* webpackChunkName: "about", webpackPrefetch:true */ '../views/AboutView.vue') 
                                                       // webpackPrefetch:true 하면 home이 불러와질때 about도 같이 불러와서 대기시킴. 
  },

  {
    path : '/test',
    name : 'TEST',
    component : () => import(/* webpackChunkName: "TEST", webpackPrefetch:true */ '../views/TestView.vue')
  },

  {
    path : '/string',
    name : 'string',
    component : () => import(/* webpackChunkName: "string", webpackPrefetch:true */ '../views/DataBinding/DataBindingStringView.vue')
  },

  {
    path : '/html',
    name : 'html',
    component : () => import(/* webpackChunkName: "databinding", webpackPrefetch:true */ '../views/DataBinding/HtmlView.vue')
  },

  {
    path : '/attribute',
    name : 'attribute',
    component : () => import(/* webpackChunkName: "attribute", webpackPrefetch:true */ '../views/DataBinding/AttributeView.vue')
  },
  {
    path : '/class',
    name : 'class',
    component : () => import(/* webpackChunkName: "class", webpackPrefetch:true */ '../views/DataBinding/ClassView.vue')
  },

  {
    path : '/input',
    name : 'input',
    component : () => import(/* webpackChunkName: "input", webpackPrefetch:true */ '../views/DataBinding/InputView.vue')
  },
  {
    path : '/list',
    name : 'list',
    component : () => import(/* webpackChunkName: "list", webpackPrefetch:true */ '../views/DataBinding/ListView.vue')
  },
  {
    path : '/csr',
    name : 'csr',
    component : () => import(/* webpackChunkName: "csr", webpackPrefetch:true */ '../views/DataBinding/CheckboxSelectRadioView.vue')
  },
  {
    path : '/calB',
    name : 'calB',
    component : () => import(/* webpackChunkName: "calB", webpackPrefetch:true */ '../views/DataBinding/Calculator(Button)View.vue')
  },
  {
    path : '/calR',
    name : 'calR',
    component : () => import(/* webpackChunkName: "calR", webpackPrefetch:true */ '../views/DataBinding/Calculator(Radio)View.vue')
  },
  {
    path : '/calCB',
    name : 'calCB',
    component : () => import(/* webpackChunkName: "calCB", webpackPrefetch:true */ '../views/DataBinding/Calculator(checkbox)View.vue')
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
