import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/Demo7';
// import './index.less';

/* 使用FastClick解决移动端使用click事件的300ms延迟问题 */
// import FastClick from 'fastclick';
// FastClick.attach(document.body);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Demo />
    </>
);