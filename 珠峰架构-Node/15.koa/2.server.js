const Koa = require('./koa');
const fs = require('fs');

const app = new Koa();

// 对koa中 ctx.request ctx.response 进行了扩展，增加一些内置方法和属性
app.use((ctx) => { 
  ctx.body = 'hello1'  // ctx.body = ctx.response.body = 'hello1'
  ctx.body = {name:'zf1'}
  // rs.pipe(ws);
  ctx.body = fs.createReadStream('./note.md')
})
app.listen(3000, function() {
    console.log(`server start 3000`)
}); // 监听一个端口号， 同我们的node中http的listen方法

