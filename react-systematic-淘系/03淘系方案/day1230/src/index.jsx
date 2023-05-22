import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote';
import Demo from './views/Demo';

/* REDUX */
import { Provider } from 'react-redux';
import store from './store';

/* ANTD */
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import './assets/reset.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <>
        <Vote />
        <Demo />
      </>
    </Provider>
  </ConfigProvider>
);