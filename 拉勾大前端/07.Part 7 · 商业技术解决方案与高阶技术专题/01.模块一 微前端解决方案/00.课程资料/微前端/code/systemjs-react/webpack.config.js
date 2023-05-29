const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "build"),
    libraryTarget: "system"
  },
  devtool: "source-map",
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false
    })
  ],
  externals: ["react", "react-dom", "react-router-dom"]
}
