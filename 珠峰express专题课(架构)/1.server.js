// 内部不是es6的写法  构造函数  异步处理 迭代 都是通过回调的方式

// express 是一个函数 可以调用这个函数 创建一个应用
const express = require('./express'); // 顺丰


const app = express(); // 创建应用 


app.get('/',function (req,res) { // 没有ctx对象 主要靠的是原生的req和res 
    res.end('/') 
});

app.get('/hello', function (req, res) { // 没有ctx对象 主要靠的是原生的req和res 
    res.end('/hello')
});

// app.all('*', function (req, res) {
//     res.end('*')
// })

app.listen(3000,function () {
    console.log('server start 3000')
});

