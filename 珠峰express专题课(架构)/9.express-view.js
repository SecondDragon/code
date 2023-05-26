// 提供了一些扩展属性和方法 
const express = require('./express');
const app = express();
// 设置查找的路径 
app.set('views','view'); // {a:1,b:2}
// 设置默认后缀
app.set('view engine', 'html');

console.log(app.set('views'))
// 如果是html 后缀 需要按照ejs 的规则来处理
// app.engine('html', require('ejs').__express); // require('ejs').renderFile
// app.get('/',function (req,res,next) {
//     res.render('hello',{name:'zf'}); // ejs jade
// })
app.get('/',function (req,res) {
    res.end('ok');
})

app.listen(3000);