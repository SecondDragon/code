import React from "react";

const MyProfile = function MyProfile({ location, match }) {
    console.log(location, match);
    /* 
     location对象
       + search 获取问号传参信息 -> '?xxx=xxx' 「Qs库/URLSearchParams」
       + state 获取隐式传递的信息
       + pathname 当前的路由地址

     match对象
       + params 存储基于“路径参数”传递过来的信息「对象」
     */
    return <div className="myProfileBox">
        我的信息
    </div>;
};
export default MyProfile;