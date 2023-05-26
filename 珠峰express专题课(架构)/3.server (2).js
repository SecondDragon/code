// 中间件的概念 控制是否向下执行 （权限处理）
// 中间件 可以扩展 req 和 res中的方法
// 中间件 一般放在路由之前
// 中间件 可以提前处理一些逻辑 和 koa 用法一样

// express 中间 如果路由 完全匹配 、 以中间件路径开头  或者路径是/ 都可以匹配到
const express = require('./express');
const app = express();
// express 中的中间件可以放置路径 这个路径的规则 和 cookie中path的一样  {path:'/a'} /
app.use(function (req,res,next) {
    req.a = 1;
    next();
})

app.use('/',function (req, res, next) {
    req.a++;
    next();
})
app.use('/a', function (req, res, next) {
    req.a++;
    next();
})
app.get('/a',function (req,res,next) {
    res.end(req.a + '')
})
app.get('/', function (req, res, next) {
    res.end(req.a + '')
})
app.listen(3000);

