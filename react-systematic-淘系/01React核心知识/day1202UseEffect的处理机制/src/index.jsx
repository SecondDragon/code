import React from 'react';
import ReactDOM from 'react-dom/client';
// import Demo from './views/Demo10';
// import Vote from './views/Vote';
import Task from './views/Task';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Task />
    </ConfigProvider>
);