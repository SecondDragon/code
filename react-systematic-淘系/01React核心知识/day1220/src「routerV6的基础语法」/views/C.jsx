import React from "react";
import { useLocation, useSearchParams, useParams } from 'react-router-dom';

const C = function C() {
    /* 
    const location = useLocation();
    // location.search:"?id=100&name=zhufeng"
    const usp = new URLSearchParams(location.search);
    console.log(usp.get('id'), usp.get('name')); 

    let [usp] = useSearchParams();
    console.log(usp.get('id'), usp.get('name'));
    */

    /* const params = useParams();
    console.log(params); //=>{id:100,name:'zhufeng'} */

    const location = useLocation();
    console.log(location.state);

    return <div className="box">
        C组件的内容
    </div>;
};
export default C;

/* 
在react-router-dom v6中，常用的路由Hook
+ useNavigate  -> 代替5中的 useHistory   ：实现编程式导航
+ useLocation 「5中也有」：获取location对象信息  pathname/search/state….
+ useSearchParams「新增的」：获取问号传参信息，取到的结果是一个URLSearchParams对象
+ useParams「5中也有」：获取路径参数匹配的信息
———————
+ useMatch(pathname) -> 代替5中的 useRouteMatch「5中的这个Hook有用，可以基于params获取路径参数匹配的信息；但是在6中，这个Hook需要我们自己传递地址，而且params中也没有获取匹配的信息，用的就比较少了！！」
*/