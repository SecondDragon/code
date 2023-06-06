const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const webpack = require('webpack');
/**
 * 如何发布线上代码,并且在线上代码出问题的时候如何进行调试
 * 1.打包 devtool设置为hidden-source-map,
 *  也会生成map文件,但是并不会在bundle.js指定map文件的位置
 * 
 */
//const babelLoader = path.join(__dirname,'loaders/babel-loader.js');
//发布测试环境的话 mode也要选择生产环境
module.exports = {
  context:process.cwd(),//上下文目录
  mode: "development",
  devtool: 'source-map',//一定要关掉
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolveLoader:{
    modules:['node_modules',path.join(__dirname,'loaders')]
  },
  module: {
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              presets:[
                "@babel/preset-env"
              ]
          }}
        ]
      },
      {
        test:/\.(jpg|png|gif|bmp)$/,
        use:[
          {
            loader:'url-loader',
            options:{
             limit:150*1024
           }}
        ]
      },
      {
        test:/\.css$/,
        use:[
         'style-loader2', //把样式文本变成一个style标签插入到页面中
         'css-loader2'   //把less编译成CSS
        ]
      }
    ]
  },
  plugins: [
   new HtmlWebpackPlugin({
     template:'./src/index.html',
     filename:'index.html'
   }),
   //可以让我们更加精细的控制sourcemap
   /* new webpack.SourceMapDevToolPlugin({
    append: '//# sourceMappingURL=http://127.0.0.1:8081/[url]',
    filename:'[file].map'
   }),
   new FileManagerPlugin({
     onEnd:{
       copy:[
         {
           source:'./dist/.map',
           
           destination:'C:/aproject/zhufeng202009webpack/3.loader/sourcemap'
         }
       ],
       delete:['./dist/*.map'],
       archive:[
         {
           source:'./dist',
           destination:'./archives/project.zip'
         }
       ]
     }
   }) */
  ],
  devServer: {},
};
/**
 *         use:['babel-loader'],
        loader:'babe-loader',
        use:{
          loader:'babel-loader'
        },
 */