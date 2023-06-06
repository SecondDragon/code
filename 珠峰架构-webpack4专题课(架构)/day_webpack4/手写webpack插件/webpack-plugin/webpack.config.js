let path = require('path');
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
let UploadPlugin = require('./plugins/UploadPlugin');
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  module:{
    rules:[
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader']}
    ]
  },
  output:{
    filename:'bundle.js',
    path: path.resolve(__dirname,'dist'),
    publicPath:'http://img.fullstackjavascript.cn/'
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new FileListPlugin({
      filename:'list.md'
    }),
    // new InlineSourcePlugin({
    //   match:/\.(js|css)/
    // })
    new UploadPlugin({
      bucket:'jwstatic', 
      domain: "img.fullstackjavascript.cn", 
      accessKey:'uimQ1Inof5KwcA5ETlLMnwoJzrIhigEEilWMpJtg', 
      secretKey:'zNoP0z1XzHFGN0JMJsxSEvLRcFPXxAVaXEDWOwdH'
    })
  ]
}