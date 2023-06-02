// 服务端入口


import createApp from './app.js';


// 服务端渲染可以返回一个函数

export default (context) => { // 服务端调用方法时会传入url属性
    // 此方法是在服务端调用的
    // 路由是异步组件 所以这里我需要等待路由加载完毕
    const { url } = context;
    return new Promise((resolve, reject) => { // renderToString()
        let { app, router, store } = createApp(); // vue-router
        router.push(url); // 表示永远跳转/路径
        router.onReady(() => { // 等待路由跳转完毕 组件已经准备号了触发
            const matchComponents = router.getMatchedComponents(); // /abc


            if (matchComponents.length == 0) { //没有匹配到前端路由
                return reject({ code: 404 });
            } else {
                // matchComponents 指的是路由匹配到的所有组件 （页面级别的组件）
                Promise.all(matchComponents.map(component => {
                    if (component.asyncData) { // 服务端在渲染的时候 默认会找到页面级组件中的asyncData，并且在服务端也会创建一个vuex ，传递给asyncData
                        return component.asyncData(store)
                    }
                })).then(()=>{ // 会默认在window下生成一个变量 内部默认就这样做的
                    // "window.__INITIAL_STATE__={"name":"jiangwen"}"
                    context.state = store.state; //  服务器执行完毕后，最新的状态保存在store.state上
                    resolve(app); // app是已经获取到数据的实例
                })
            }
        })
    })



    // app 对应的就是newVue 并没有被路由所管理，我希望等到路由跳转完毕后 在进行服务端渲染

    // 当用户访问了一个不存在的页面，如何匹配到前端的路由

    // 每次都能产生一个新的应用
}

// 当用户访问bar的时候：我在服务端直接进行了服务端渲染，渲染后的结果返回给了浏览器。 浏览器加载js脚本，根据路径加载js脚本，用重新渲染了bar