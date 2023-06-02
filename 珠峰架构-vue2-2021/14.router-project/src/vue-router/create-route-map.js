import router from "../router";

export function createRouteMap(routes,oldPathMap){
    // 如果有oldPathMap 我需要将routes格式化后 放到oldPathMap中
    // 如果没有传递 需要生成一个映射表
    let pathMap = oldPathMap || {}
    routes.forEach(route=>{
        addRouteRecord(route,pathMap);
    })
    return {
        pathMap
    }
}
function addRouteRecord(route,pathMap,parent){
    let path =parent? `${parent.path}/${route.path}` :route.path ;
    // 将记录 和 路径关联起来
    let record = { // 最终路径 会匹配到这个记录,里面可以自定义属性等
        path,
        component:route.component, // 组件
        props:route.props || {},
        parent
    }
    pathMap[path] = record;
    route.children && route.children.forEach(childRoute=>{
        addRouteRecord(childRoute,pathMap,record); // 在循环儿子的时候将父路径也同时传入，目的是为了在子路由添加的时候可以拿到父路径
    })
}