//  客户端渲染

// 每个用户访问服务器 都要产生一个新的实例，不能所有用户使用同一个实例


import createApp from './app.js';
let {app} = createApp();
app.$mount('#app'); // 客户端渲染可以直接使用client-entry.js