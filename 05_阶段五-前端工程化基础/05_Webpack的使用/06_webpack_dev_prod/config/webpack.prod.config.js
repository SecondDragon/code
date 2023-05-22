const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.comm.config")

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    clean: true
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})
