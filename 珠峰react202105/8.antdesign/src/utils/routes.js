import {Route,Redirect} from 'dva/router';
/**
 * 把配置式路由配置对象数组转换为路由组件(声明式)
 * @param {*} routesConfig 
 */
export function renderRoutes(routesConfig){
  return routesConfig.map(({path,exact=false,redirect=false,component:RouteComponent,routes=[]},index)=>(
    <Route path={path} exact={exact} key={index} render={(routeProps)=>(
        //把当前组件的子路由配置传递给当前组件，由当前组件在合适的位置以合适的方式进行渲染
        <RouteComponent {...routeProps} routes={routes}/>
    )}/>
  ));
}

export function renderRedirect(from,exact,routesConfig){
   let {path} = routesConfig.find(route=>route.redirect)||routesConfig[0];
   return <Redirect exact={exact} from={from} to={path}/>
}