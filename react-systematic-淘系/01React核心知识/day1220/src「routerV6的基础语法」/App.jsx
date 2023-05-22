import React from "react";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeHead from './components/HomeHead';
/* 导入需要的组件 */
import A from './views/A';
import B from './views/B';
import C from './views/C';
import A1 from './views/a/A1';
import A2 from './views/a/A2';
import A3 from './views/a/A3';

const App = function App() {
    return <HashRouter>
        <HomeHead />
        <div className="content">
            {/* 
            所有的路由匹配规则，放在<Routes>中；
            每一条规则的匹配，还是基于<Route>；
              + 路由匹配成功，不再基于component/render控制渲染的组件，而是基于element，语法格式是<Component/>
              + 不再需要Switch，默认就是一个匹配成功，就不在匹配下面的了
              + 不再需要exact，默认每一项匹配都是精准匹配
            原有的<Redirect>操作，被 <Navigate to="/" /> 代替！！
              + 遇到 <Navigate/> 组件，路由就会跳转，跳转到to指定的路由地址
              + 设置 replace 属性，则不会新增立即记录，而是替换现有记录
              + <Navigate to={{...}}/> to的值可以是一个对象：pathname需要跳转的地址、search问号传参信息
            */}
            <Routes>
                <Route path="/" element={<Navigate to="/a" />} />
                <Route path="/a" element={<A />}>
                    {/* v6版本中，要求所有的路由(二级或者多级路由)，不在分散到各个组件中编写，而是统一都写在一起进行处理！！ */}
                    <Route path="/a" element={<Navigate to="/a/a1" />} />
                    <Route path="/a/a1" element={<A1 />} />
                    <Route path="/a/a2" element={<A2 />} />
                    <Route path="/a/a3" element={<A3 />} />
                </Route>
                <Route path="/b" element={<B />} />
                <Route path="/c/:id?/:name?" element={<C />} />
                {/* 如果以上都不匹配，我们可以渲染404组件，也可以重定向到A组件「传递不同的问号参数信息」 */}
                <Route path="*" element={<Navigate to={{
                    pathname: '/a',
                    search: '?from=404'
                }} />} />
            </Routes>
        </div>
    </HashRouter>;
};

export default App;