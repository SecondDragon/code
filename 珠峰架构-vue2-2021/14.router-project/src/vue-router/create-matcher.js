import { createRouteMap } from "./create-route-map";

export function createMatcher(routes){

    // 路径和记录匹配  /  record
    let {pathMap} = createRouteMap(routes); // 创建映射表  v


   
    function match(path){
        // 帮你去pathMap中找到对应的记录
        return pathMap[path];
    };
    function addRoutes(routes){
        // 将新的路由添加到 pathMao中
        createRouteMap(routes,pathMap);
    }
    // 面试会问 动态路由的实现 就是将新的路由插入到老的路由的映射表中
 


    return {
        addRoutes,
        match
    }
}   