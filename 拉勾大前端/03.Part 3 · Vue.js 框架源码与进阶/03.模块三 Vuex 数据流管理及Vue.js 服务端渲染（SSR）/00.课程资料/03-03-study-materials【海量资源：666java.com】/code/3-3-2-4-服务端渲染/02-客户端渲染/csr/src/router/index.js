import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/views/Home'
import About from '@/views/About'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

export default router
