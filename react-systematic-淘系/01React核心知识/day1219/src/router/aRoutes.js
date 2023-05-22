// A组件的二级路由表
import { lazy } from 'react';
const aRoutes = [{
    redirect: true,
    from: '/a',
    to: '/a/a1',
    exact: true
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: lazy(() => import(/* webpackChunkName:"AChild" */'../views/a/A1')),
    meta: {}
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: lazy(() => import(/* webpackChunkName:"AChild" */'../views/a/A2')),
    meta: {}
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: lazy(() => import(/* webpackChunkName:"AChild" */'../views/a/A3')),
    meta: {}
}];
export default aRoutes;