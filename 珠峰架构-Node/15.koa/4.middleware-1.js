const Koa = require('./koa');
const fs = require('fs');

const app = new Koa();
app.use(async (ctx, next) => {
    console.log(1);
    await next()
    await next()
    console.log(2);
})
app.use(async (ctx, next) => {
    console.log(3);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('sleep');
            resolve();
        }, 1000);
    })
    next();
    console.log(4);
})
app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
});
app.on('error',function (err) {
    console.log('err1',err);
})

// next前面必须加await 这样才能保证后面的中间件可以正常执行
// 所有的异步方法都必须变成promise，因为await 可以等待promise完成
app.listen(3000, function() {
    console.log(`server start 3000`)
});

// 1.支持中间件的写法use(组合) 2. 监听错误(对错误的监听) 3.扩展了req和res中的属性和方法