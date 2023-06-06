let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development', 
  entry:'./src/index.js', 
  output:{
    filename:'bundle.[hash:8].js', 
    path: path.resolve(__dirname,'build'),
  },
  plugins:[ 
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      minify:{
        removeAttributeQuotes:true,
        collapseWhitespace:true,
      },
      hash: true
    })
  ]
}