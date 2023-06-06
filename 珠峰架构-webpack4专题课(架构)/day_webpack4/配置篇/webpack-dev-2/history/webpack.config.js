let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // 多入口
  mode: 'production',
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // [name] home,other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other']
    })
  ]
}


