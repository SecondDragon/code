let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization:{ // 优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCss()
    ]
  },
  mode: 'development', 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename:'main.css'
    }),
    // new webpack.ProvidePlugin({ // 在每个模块中都注入$
    //     $:'jquery'
    // })
  ],
  externals: {
      jquery: "$"
  },
  module: { 
    rules: [
      // {
      //   test:require.resolve('jquery'),
      //   use:'expose-loader?$'
      // },
      
      // loader 默认 是从右边向左执行 从下到上
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'eslint-loader',
      //     options:{
      //        enforce:'pre' // previous   post
      //     }
      //   }
      // },
      {
        test:/\.js$/, // normal 普通的loader
        use:{
          loader:'babel-loader',
          options:{ // 用babel-loader 需要把es6-es5
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader',
          'less-loader'
          
        ]
      }
    ]
  }
}