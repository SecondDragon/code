import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';
/* REDUX */
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Vote />
        </Provider>
    </ConfigProvider>
);