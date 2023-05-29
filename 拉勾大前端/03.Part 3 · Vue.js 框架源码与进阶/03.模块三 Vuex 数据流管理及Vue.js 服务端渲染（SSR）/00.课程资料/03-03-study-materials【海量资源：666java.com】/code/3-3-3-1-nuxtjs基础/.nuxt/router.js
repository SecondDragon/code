import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _68046e4b = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */))
const _3e155394 = () => interopDefault(import('..\\pages\\article\\_id.vue' /* webpackChunkName: "pages_article__id" */))
const _f0876de0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _68046e4b,
    name: "about"
  }, {
    path: "/article/:id?",
    component: _3e155394,
    name: "article-id"
  }, {
    path: "/",
    component: _f0876de0,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
