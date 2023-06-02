const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const VueServerRenderer = require('vue-server-renderer')
const static = require('koa-static')

const fs = require('fs');
const path = require('path')
const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8')
const template = fs.readFileSync(path.resolve(__dirname, 'dist/server.html'), 'utf8');


// 根据实例
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
    template
})

router.get('/', async (ctx) => {
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString((err, html) => { // 如果想让css生效 只能使用回调的方式
            if (err) reject(err);
            resolve(html)
        })
    })
    //    const html = await render.renderToString(); // 生成字符串
    //    console.log(html)
})

// 当客户端发送请求时会先去dist目录下查找
app.use(static(path.resolve(__dirname,'dist')))
app.use(router.routes());
app.listen(3000);