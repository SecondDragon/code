import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoApp from '@/components/TodoApp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TodoApp
  },
  {
    path: '/active',
    component: TodoApp
  },
  {
    path: '/completed',
    component: TodoApp
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'selected'
})

export default router
