import React from 'react';
import {Route,Redirect} from '../react-router-dom';
/* const withProtected = (OldComponent)=>{
   return class extends React.Component{

   }
}
 */

const Protected = (props)=>{
    let {path,component:RouteComponent} = props;
    return (
        <Route path={path} render={
            (routeProps)=>{
                let logined = localStorage.getItem('logined');
                if(logined){
                    return <RouteComponent {...routeProps}/>
                }else{
                    return <Redirect to={{pathname:'/login',state:{from:path}}}/>
                }
            }
        }/>
    )
}

export default Protected;
/**
 * 在Route组件里，指定渲染的内容有三种方法
 * 1.component 直接指定组件，不能添加逻辑
 * 2.render 传递一个render函数，此函数会返回一个要渲染的render元素
 * 3.children
 */