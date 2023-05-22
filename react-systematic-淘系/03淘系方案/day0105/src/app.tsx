import { matchRoutes } from 'umi';

/* 每一次路由切换时触发 */
export function onRouteChange({ clientRoutes, location, routes }) {
    // console.log(clientRoutes); //和当前匹配的路由配置项
    // console.log(location); //当前匹配的location对象
    // console.log(routes); //所有的路由配置项「扁平化后的」
    const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
    let title = route ? route.title : '';
    document.title = `${title ? title + '-' : ''}珠峰培训UMI`;
};