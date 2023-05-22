import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Vote from '../views/Vote';
import Demo from '../views/Demo';

/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '../assets/reset.min.css';

function RouterConfig({ history }) {
    return (
        <ConfigProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Vote} />
                    <Route path="/demo" component={Demo} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

export default RouterConfig;