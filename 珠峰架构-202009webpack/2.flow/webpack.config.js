const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DonePlugin = require('./plugins/DonePlugin');
const InfoPlugin = require('./plugins/InfoPlugin');
module.exports = {
  context:process.cwd(),//上下文目录
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {},
  plugins: [
    /* new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }), */
    new DonePlugin(),
    new InfoPlugin()
  ],
  devServer: {},
};