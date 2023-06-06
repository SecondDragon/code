let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');


// 1) cleanWebpackPlugin 
// 2) copyWebpackPlugin
// 3) bannerPlugin  内置
module.exports = {
  mode: 'production',
  entry: { home: './src/index.js', },
  module: {
    rules: [
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
  watch:true,
  watchOptions:{ // 监控的选项
    poll:1000, // 每秒 问我 1000次
    aggregateTimeout:500, // 防抖 我一直输入代码 
    ignored:/node_modules/ // 不需要进行监控哪个文件
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ]
}