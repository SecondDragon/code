// 服务端入口


import createApp from './app.js';


// 服务端渲染可以返回一个函数

export default ()=>{
    // 此方法是在服务端调用的
    let {app} = createApp();
    return app; // 每次都能产生一个新的应用
}
