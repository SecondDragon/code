import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import loadable from '@/utils/loadable';
import hooks from './hooks';
Vue.use(VueRouter);
// 自动生成路由 不建议路由自动配置 可配置性比较低 （批注，钩子）
// webapp  活动页
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/lesson',
        name: 'lesson',
        component: loadable(() => import('@/views/lesson/index.vue')), // ? 默认白页 加载完毕在去渲染 prefetch  -> loading
        meta:{
            needLogin:true // 必须需要登录
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: loadable(() => import('@/views/profile/index.vue'))
    },
    {
        path:'/login',
        name: 'login',
        component: loadable(() => import('@/views/login/index.vue'))
    },
    {
        path:'/reg',
        name: 'reg',
        component: loadable(() => import('@/views/reg/index.vue'))
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// vue3 里面支持await的写法
Object.values(hooks).forEach(hook=>{
    router.beforeEach(hook);
});


export default router