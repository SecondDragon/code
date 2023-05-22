const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.comm.config")

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    hot: true,
    // host: "0.0.0.0",
    // port: 8888,
    // open: true
    // compress: true
  }
})
