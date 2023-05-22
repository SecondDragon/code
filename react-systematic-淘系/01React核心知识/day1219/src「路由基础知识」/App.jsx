import React from "react";
import { HashRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

/* 导入组件 */
import A from './views/A';
import B from './views/B';
import C from './views/C';

/* 导航区域的样式 */
import styled from "styled-components";
const NavBox = styled.nav`
   a{
    margin-right: 10px;
    color: #000;
   }
`;

const App = function App() {
    /* 
    基于<HashRouter>把所有要渲染的内容包起来，开启HASH路由 
      + 后续用到的<Route>、<Link>等，都需要在HashRouter/BrowserRouter中使用
      + 开启后，整个页面地址，默认会设置一个 #/ 哈希值

    Link实现路由切换/跳转的组件
      + 最后渲染完毕的结果依然是A标签
      + 它可以根据路由模式，自动设定点击A切换的方式
    */
    return <HashRouter>
        {/* 导航部分 */}
        <NavBox>
            <Link to="/">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </NavBox>

        {/* 路由容器:每一次页面加载或者路由切换完毕，都会根据当前的哈希值，到这里和每一个Route进行匹配，把匹配到的组件，放在容器中渲染！！ */}
        <div className="content">
            {/* 
             Switch：确保路由中，只要有一项匹配，则不再继续向下匹配
             exact：设置匹配模式为精准匹配
             */}
            <Switch>
                <Route exact path="/" component={A} />
                <Route path="/b" component={B} />
                <Route path="/c" render={() => {
                    // 当路由地址匹配后，先把render函数执行，返回的返回值就是我们需要渲染的内容
                    // 在此函数中，可以处理一些事情，例如：登录态检验....
                    let isLogin = true;
                    if (isLogin) {
                        return <C />;
                    }
                    return <Redirect to="/login" />
                }} />
                {/* 
                  // 放在最后一项，path设置※或者不写，意思是：以上都不匹配，则执行这个规则
                  <Route path="*" component={404组件} /> 
                  // 当然也可以不设置404组件，而是重定向到默认 / 地址：
                  <Redirect from="" to="" exact/>
                    + from:从哪个地址来
                    + to:重定向的地址
                    + exact是对from地址的修饰，开启精准匹配
                */}
                <Redirect to="/" />
            </Switch>
        </div>
    </HashRouter>;
};

export default App;

/* 
路径地址匹配的规则
  路由地址:Route中path字段指定的地址
  页面地址:浏览器URL后面的哈希值

  页面地址   路由地址   非精准匹配   精准匹配
    /         /         true      true
    /         /login    false     false
    /login    /         true      false
    /a/b      /a        true      false
    /a/b/     /a/b      true      true
    /a2/b     /a        false     false
  ....

/ 和 /xxx 算是地址中的一个整体！！
非精准匹配：
  @1 页面地址和路由地址一样，返回true
  @2 页面地址中，包含一套完整的路由地址，返回true
  @3 剩下返回的都是false
精准匹配：
  @1 两个地址只有一模一样才匹配「最后一个/可以忽略」
*/