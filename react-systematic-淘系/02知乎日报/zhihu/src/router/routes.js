import { lazy } from 'react';
import Home from '../views/Home';
import { withKeepAlive } from 'keepalive-react-component';

const routes = [{
    path: '/',
    name: 'home',
    component: withKeepAlive(Home, { cacheId: 'home', scroll: true }),
    meta: {
        title: '知乎日报-WebApp'
    }
}, {
    path: '/detail/:id',
    name: 'detail',
    component: lazy(() => import('../views/Detail')),
    meta: {
        title: '新闻详情-知乎日报'
    }
}, {
    path: '/personal',
    name: 'personal',
    component: lazy(() => import('../views/Personal')),
    meta: {
        title: '个人中心-知乎日报'
    }
}, {
    path: '/store',
    name: 'store',
    component: lazy(() => import('../views/Store')),
    meta: {
        title: '我的收藏-知乎日报'
    }
}, {
    path: '/update',
    name: 'update',
    component: lazy(() => import('../views/Update')),
    meta: {
        title: '修改个人信息-知乎日报'
    }
}, {
    path: '/login',
    name: 'login',
    component: lazy(() => import('../views/Login')),
    meta: {
        title: '登录/注册-知乎日报'
    }
}, {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: {
        title: '404页面-知乎日报'
    }
}];
export default routes;