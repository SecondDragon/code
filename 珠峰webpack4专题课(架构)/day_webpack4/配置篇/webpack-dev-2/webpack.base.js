let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
// 1) cleanWebpackPlugin 
// 2) copyWebpackPlugin
// 3) bannerPlugin  内置
module.exports = {
 
  entry: { home: './src/index.js', },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve:{ // 解析 第三方包 common
    modules:[path.resolve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
    // mainFields:['style','main']
    // mainFiles:[], // 入口文件的名字 index.js
    // alias:{ // 别名 vue vue.runtime
    //   bootstrap:'bootstrap/dist/css/bootstrap.css'
    // }
  },
  devServer:{
    //3) 有服务端 不用用代理来处理 能不能再服务端中启动webpack 端口用服务端端口
    
    
    //2） 我们前端只想单纯来模拟数据
    // before(app){ // 提供的方法 钩子
    //   app.get('/user',(req,res)=>{
    //     res.json({name:'珠峰架构-before'})
    //   })
    // }
    //1）
    // proxy:{ // 重写的方式 把请求代理到express服务器上
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{'/api':''}
    //   }// 配置了一个代理
    // }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV:JSON.stringify('production'),   //console.log('dev')
      FLAG:'true',
      EXPORESSION:JSON.stringify('1+1')
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    // new CleanWebpackPlugin('./dist'),
    // new CopyWebpackPlugin([ // 拷贝插件
    //   {from:'doc',to:'./'}
    // ]),
    // new webpack.BannerPlugin('make 2019 by jw')
  ]
}