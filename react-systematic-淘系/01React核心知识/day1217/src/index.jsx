import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from './views/Task';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';
/* mobx */
import { Provider } from 'mobx-react';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        {/* 基于Provider把各个版块Store的实例，都放在上下文中 */}
        <Provider {...store} /*=> task={store.task} personal={store.personal} */>
            <Task />
        </Provider>
    </ConfigProvider>
);