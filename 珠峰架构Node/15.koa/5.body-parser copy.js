const Koa = require('koa');
const path = require('path')
const app = new Koa();
// const bodyParser = require('./middleware/body-parser'); // koa-bodyparser
const bodyParser = require('koa-bodyparser'); 
// const static = require('./middleware/koa-static');
const static = require('koa-static');

// 用户 默认发送get请求 /form 就返回一个表单功能
// 用户可能会提交数据  post /form ，我需要将数据再服务端解析好后返回
app.use(bodyParser()); // 中间件函数 必须要返回一个函数,为了方便传递参数

// 指定多个静态服务路径
app.use(static(path.resolve(__dirname,'public')));
app.use(static(path.resolve(__dirname,'koa')));
// app.use(async (ctx, next) => {
//     // if (ctx.method === 'GET' && ctx.path === '/form') {
//     //     ctx.body = `
//     //     <form action="/form" method="POST">
//     //         <input type="text" name="username">
//     //         <input type="text" name="password">
//     //         <button>提交</button>
//     //     </form>
//     //     `
//     //     console.log(ctx.request.body)
//     // } else {
//     //     await next();
//     // }
// })
app.use(async (ctx, next) => {
    // 如何解析请求体？
    if (ctx.method === 'POST' && ctx.path == '/form') {
        ctx.set('Content-Type','text/plain')
        ctx.body = ctx.request.body;
    }
})



app.listen(3000, () => {
    console.log(`server start 3000`);
})