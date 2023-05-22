import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from './views/Task';
/* 使用ANTD组件库 */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './index.less';

import './fetchDemo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <Task />
    </ConfigProvider>
);