const Koa = require('koa');
const fs = require('fs');

const app = new Koa();
// 1 3 2 sleep 5 6 4  会把多个函数组合成一个promise，当这个最外层的promise成功后就会采用ctx.bdoy的结果

// 所有的use中的函数 都必须添加async 和 await 因为你不知道后面的逻辑是否有异步操作，如果不加await可能会出现不可控的问题
// 我们可以使用 await 也可以使用 return 因为都可以达到等待下一个promise执行完毕
app.use(async (ctx, next) => { // 都会把最外层的函数全部执行完毕
    console.log(1);
    // ctx.body = 'hello' //ctx.body = hello
    return next(); // ctx.body = 'world';
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
    await next();
    //ctx.body = 'world';
    console.log(4);
})
app.use((ctx, next) => {

    console.log(5);
    await next();
    console.log(6);
});

// next前面必须加await 这样才能保证后面的中间件可以正常执行
// 所有的异步方法都必须变成promise，因为await 可以等待promise完成
app.listen(3000, function() {
    console.log(`server start 3000`)
});