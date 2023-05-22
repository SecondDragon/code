// express

let express = require('express');
let app = express();
let webpack = require('webpack');

// 中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

app.use(middle(compiler));

app.get('/user',(req,res)=>{
  res.json({name:'珠峰架构1'})
})

app.listen(3000);