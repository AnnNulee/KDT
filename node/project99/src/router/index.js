import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/string',
        name: 'string',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/StringView.vue')
    },
    {
        path: '/html',
        name: 'html',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/HtmlView.vue')
    },
    {
        path: '/input',
        name: 'input',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/InputView.vue')
    },
    {
        path: '/class',
        name: 'class',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/ClassView.vue')
    },
    {
        path: '/input',
        name: 'input',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/InputView.vue')
    },
    {
        path: '/input',
        name: 'input',
        component : () => import(/* webpackChunkName: "DataBinding", webpackPrefetch:true */ '../views/DataBinding/InputView.vue')
    },

]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router
  