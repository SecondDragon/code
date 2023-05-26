const express = require('express');
const app = express();
// koa 和 express 的区别 koa 他的特点是 把promie组合起来可以实现等待
// express 不能实现
app.use(async function (req,res,next) { // 没有等待
    const start = Date.now();
    let oldEnd = res.end;
    res.end = function (value) {
        const end = Date.now();
        console.log(end - start);
        oldEnd.call(res, value);
    }
    next();
})
app.get('/', function (req,res) {
    setTimeout(() => {
        res.end('/');
    }, 1000);
})
app.get('/user', function (req,res) {
    setTimeout(() => {
        res.end('/user');
    }, 2000);
})
app.listen(3000);