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
    console.log('跳转')
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => { // 如果想让css生效 只能使用回调的方式
            if (err) reject(err);
            resolve(html)
        })
    })
    //    const html = await render.renderToString(); // 生成字符串
    //    console.log(html)
})

// 当用户访问一个不存在的路径的服务端路径 我就返回给你首页，你通过前端的js渲染的时候，会重新根据路径渲染组件

// 只要用户刷新就会像服务器发请求
router.get('/(.*)',async (ctx)=>{
    console.log('跳转')
    ctx.body = await new Promise((resolve, reject) => {
        render.renderToString({url:ctx.url},(err, html) => { // 通过服务端渲染 渲染后返回
            if (err && err.code == 404) resolve(`not found`);
            console.log(html)
            resolve(html)
        })
    })
})


// 当客户端发送请求时会先去dist目录下查找
app.use(static(path.resolve(__dirname,'dist'))); // 顺序问题
app.use(router.routes());

// 保证先走自己定义的路由 在找静态文件
app.listen(3000);


// 1. 服务端渲染的核心 是解析vue的实例 生成一个字符串, 返回给浏览
// createRender.renderToString(vm)
// let vm = new Vue({
//     template:'<div>hello world</div>'
// })

// 2.通过webpack打包 把所有的代码进行了打包，返回了一个函数，函数执行后的结果是一个promise -> vue的实例
// createBundleRenderer 找到webpack打包的后的函数， 内部会调用这个函数获取到vue的实例
// .renderToString(vm) => 生成一个是字符串，返回给浏览器

// createBundleRenderer 去调用函数，获取实例
// renderToString() 根据实例生成一个字符串

// node目的：可以解析js语法，可以将vue的实例渲染成字符串

// 默认直接通过url 回车输入-》 访问的都是服务端 （通过的是服务端渲染）
// 后续操作是通过浏览器的api进行跳转的

// 只有首屏才有seo?  所有页面直接访问都具备服务端渲染，只是我们第一次加载的页面是服务端渲染的，后续通过前端路由

// 用户访问过某个网页 我就把整个页面存到redis 里，下次在访问直接把上次渲染的好的html返回
// router.push() 内部被重写了 (跳转+组件渲染) window.location.pathname  跳转

// redis 可以消息通知 可以清缓存 ， 过期时间

// 数据在前端还是后端请求 ， 需要看你使用的场景，如果你希望加载的html的内容很快的被显示，那就在服务端，如果是后续点击按钮 其他逻辑 可以使用前端请求

// vuex 