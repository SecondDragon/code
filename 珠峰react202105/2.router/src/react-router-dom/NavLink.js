import React from 'react';
import {Route} from '../react-router';
//import matchPath from '../react-router/matchPath';
import Link from './Link';
function NavLink(props){
    const {
        to:path,//Link指向的路径
        className:classNameProp='',//基本的类名
        style:styleProp={},//基本的行内样式
        activeClassName='active',//激活的类名
        activeStyle={},//激活的行内样式
        children,//儿子
        exact//是否要精确匹配
    }= props;
     return (
        <Route path={path} exact={exact}>
            {
                ({match})=>{
                    let className = match?joinClassNames(classNameProp,activeClassName):classNameProp;
                    let style =match?{...styleProp,...activeStyle}:styleProp;
                    let linkProps = {
                        className,
                        style,
                        to:path,
                        children
                    }
                    return <Link {...linkProps}/>
                }
            }
        </Route>
     )   
}

/* 
function NavLink(props){
    let context = React.useContext(RouterContext);
    let {location:{pathname}}= context;
    const {
        to:path,//Link指向的路径
        className:classNameProp='',//基本的类名
        style:styleProp={},//基本的行内样式
        activeClassName='active',//激活的类名
        activeStyle={},//激活的行内样式
        children,//儿子
        exact//是否要精确匹配
    }= props;
    //pathname浏览器的路径 path来自于NavLink的配置
    let isActive = matchPath(pathname,{path,exact});
    let className = isActive?joinClassNames(classNameProp,activeClassName):classNameProp;
    let style = isActive?{...styleProp,...activeStyle}:styleProp;
    let linkProps = {
        className,
        style,
        to:path,
        children
    }
    return <Link {...linkProps}/>;
} */

function joinClassNames(...classnames){
  return classnames.filter(c=>c).join(' ');
}
export default NavLink;