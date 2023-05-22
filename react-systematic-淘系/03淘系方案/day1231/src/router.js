import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import routes from './routerRoutes';

/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.less';

/* 动态路由 */
// 根据路由表，动态创建路由匹配机制
const Element = function Element(props) {
  let { component: Component, history, location, match } = props;
  // ...
  let config = { history, location, match };
  return <Component {...config} />;
};
const createRoute = routes => {
  return <Switch>
    {routes.map((item, index) => {
      let { path, exact, meta, redirect } = item,
        config = {};
      // 重定向
      if (redirect) {
        config = { from: path, to: redirect };
        if (exact) config.exact = exact;
        return <Redirect key={index} {...config} />;
      }
      // 正常路由
      config = { path };
      if (exact) config.exact = exact;
      return <Route key={index} {...config}
        render={props => {
          // @1 修改页面标题
          let title = meta?.title;
          document.title = `${title ? title + '-' : ''}珠峰培训REACT`;
          // @2 不直接渲染指定的组件，统一渲染Element，在这里可以做更复杂的操作「例如：登录态校验等」
          return <Element {...props} {...item} />;
        }} />;
    })}
  </Switch>;
};

/* 一级路由 */
export default function RouterConfig({ history }) {
  return <ConfigProvider locale={zhCN}>
    <Router history={history}>
      {createRoute(routes)}
    </Router>
  </ConfigProvider>;
};

/* 二级路由 */
export const LevelTwoRouterConfig = function LevelTwoRouterConfig({ path }) {
  // 根据path去一级路由中筛选，查找对应的二级路由
  let item = routes.find(item => item.path === path),
    children = item?.children;
  if (!children) return null;
  return createRoute(children);
};