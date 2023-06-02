import Vue from 'vue'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter); // 注册两个全局组件  install(Vue)


// 核心实现就是根据路径变化 找到对应的组件， 显示到router-view中
// hash模式 history模式


// about=> About   /about/a => AComponent
// 父 router-view
// 子 router-view



const routes = [ // 映射表  用户配置
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children:[
      {path:'a',component:{
        render:(h)=> <h1>about a</h1>
      }},
      {path:'b',component:{
        render:(h)=> <h1>about b</h1>
      }}
    ]
  }
]
// 最终生成了一个vue-router实例
// const store = Vuex.Store()
const router = new VueRouter({
  mode:'hash', // # 丑 兼容性好  / 好看 但是需要服务端支持，在开发环境内部提供了historyFallback插件
  routes
})

export default router
