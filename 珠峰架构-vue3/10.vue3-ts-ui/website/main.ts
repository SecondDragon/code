import {createApp } from 'vue';
import App from './App.vue'
import ZUI from 'z-ui'
// import ZUI from '../lib/index.esm.js'  // esm模块

import 'theme-chalk/src/index.scss'
// 创建应用 并使用组件库


// 可以在这里做一个 网站 ，显示所有组件 
// 头部 导航条 菜单.....
createApp(App).use(ZUI).mount('#app');


// umd 为了直接能使用 但是只支持 commonjs 和 amd规范  webpack
// esm模块 es6准备的  可以在webpack 或者esm规范下使用
// gulp 用来打包css样式的

// 分组件打包 按需加载 把每个组件单独进行打包
