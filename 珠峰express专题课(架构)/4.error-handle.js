// 我们希望在任何中间件 或者路由中出现错误都可以统一处理
const express = require('express');

const app = express();

app.use(function (req,res,next) {
    let flag = Math.random() > 0.5;
    if(flag){
        return next('出错了');
    }
    next();
})
app.get('/',function (req,res,next) {
    console.log('/1');
    next();
})
app.get('/', function (req, res, next) {
    console.log('/2');
    res.end('/')
})
// 规定写法
app.use((err,req,res,next)=>{
    res.setHeader('Content-Type','text/html;charset=utf8')
    res.end(err)
})
app.listen(3000);


