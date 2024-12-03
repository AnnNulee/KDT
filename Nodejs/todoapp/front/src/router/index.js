import { createRouter, createWebHistory } from 'vue-router'
import todoView from '../views/todoView.vue'

const routes = [
{
  path: '/',
  name: 'todo',
  component: todoView
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
