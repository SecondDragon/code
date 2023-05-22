import React from "react";
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const B = function B() {
    const navigate = useNavigate();
    const handle = () => {
        /* 
        // 问号传参
        navigate({
            pathname: '/c',
            search: qs.stringify({
                id: 100,
                name: 'zhufeng'
            })
        }); 
        */

        /* // 路径参数
        navigate(`/c/100/zhufeng`); */

        // 隐式传参
        navigate('/c', {
            //历史记录池替换现有地址
            replace: true,
            //隐式传参信息
            state: {
                id: 100,
                name: 'zhufeng'
            }
        });
    };
    return <div className="box">
        B组件的内容
        <button onClick={handle}>按钮</button>
    </div>;
};
export default B;

/*
 在react-router-dom v6中 ，实现路由跳转的方式：
   + <Link/NavLink to="/a" > 点击跳转路由
   + <Navigate to="/a" /> 遇到这个组件就会跳转
   + 编程式导航：取消了history对象，基于navigate函数实现路由跳转
     import { useNavigate } from 'react-router-dom';
     const navigate = useNavigate();
     navigate('/c');
     navigate('/c', { replace: true });
     navigate({
        pathname: '/c'
     });
     navigate({
        pathname: '/c',
        search: '?id=100&name=zhufeng'
     });
     ...
 */

/*
 在react-router-dom v6中 ，即便当前组件是基于<Route>匹配渲染的，也不会基于属性，把history/location/match传递给组件！！想获取相关的信息，我们只能基于Hook函数处理！！
   + 首先要确保，需要使用“路由Hook”的组件，是在Router「HashRouter或BrowserRouter」内部包着的，否则使用这些Hook会报错！！
   + 只要在<Router>内部包裹的组件，不论是否是基于<Route>匹配渲染的 
     + 默认都不可能再基于props获取相关的对象信息了
     + 只能基于“路由Hook”去获取！！

 为了在类组件中也可以获取路由的相关信息：
 1. 稍后我们构建路由表的时候，我们会想办法：继续让基于<Route>匹配渲染的组件，可以基于属性获取需要的信息
 2. 不是基于<Route>匹配渲染的组件，我们需要自己重写withRouter「v6中干掉了这个API」，让其和基于<Route>匹配渲染的组件，具备相同的属性！！
 */