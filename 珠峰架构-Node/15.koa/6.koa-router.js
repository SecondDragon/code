const Koa = require('koa');
const path = require('path')
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
// const Router = require('./middleware/koa-router');
const Router = require('koa-router')
const router = new Router();

app.use(bodyParser());
app.use(async (ctx,next)=>{
    // 之前的逻辑 
    await next()
    console.log('访问我了')
    // 之后的逻辑
})
app.use(router.routes());

router.get('/user/add', async (ctx, next) => {
    ctx.body = 'user/add';
})
router.get('/user/remove', async (ctx, next) => {
    ctx.body = 'user/remove';
    console.log(1)
})
router.get('/user/remove', async (ctx, next) => {
    console.log(2)
    ctx.body = 'user/remove2';
})
app.use(static(path.resolve(__dirname, 'public')));
app.use(static(path.resolve(__dirname, 'koa')));
// app.use(async (ctx, next) => {
//     // 如何解析请求体？
//     if (ctx.method === 'POST' && ctx.path == '/form') {
//         ctx.set('Content-Type','text/plain')
//         ctx.body = ctx.request.body;
//     }
// })
app.listen(3000, () => {
    console.log(`server start 3000`);
})