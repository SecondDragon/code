const Koa = require('./koa/lib/application');

// 使用koa就创造一个应用实例
const app = new Koa();

app.use((ctx) => { // ctx中扩展了 请求和响应的方法
    // 先理解成 res.end();

    // ctx中 有5个比较重要的属性 
    // app 当前应用实例 我可以在app上扩展公共方法
    // req.res 原生node中的req和res
    // request.response 是koa里面自己封装的

    // koa中对request和response进行一层抽象 叫request和response。在开发的时候 我们尽量避免操作原生的req和res
    //console.log(ctx.req.url);
    //console.log(ctx.request.req.url);

    //console.log(ctx.request.query); // ctx.request.__proto__.__proto__
    console.log(ctx.query); // 希望不通过 vm = new Vue{data:{}} vm.xxx => vm.data.xxx

})
// polyfill 垫片 比如说某个功能无法实现 ，写一个垫片来实现 
app.listen(3000, function() {
    console.log(`server start 3000`)
}); // 监听一个端口号， 同我们的node中http的listen方法