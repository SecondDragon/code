const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development", // 打包模式
  devtool: false, //不生成source-map
  //每个入口是一个代码块
  entry: "./src/index.js", //入口文件的路径
  output: {
    //path只能是绝对路径,不能是相对路径
    path: path.resolve(__dirname, "dist"), //打包后的文件保存在哪个目录
    filename: "[name].js", //打包后的文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    })
  ],
};