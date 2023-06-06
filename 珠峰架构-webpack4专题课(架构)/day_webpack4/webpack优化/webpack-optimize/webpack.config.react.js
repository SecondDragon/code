let path = require('path');
let webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]', // _dll_react
    //libraryTarget:'var' // commonjs var this ....
  },
  plugins: [
    new webpack.DllPlugin({ // name == library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
}