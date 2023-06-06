let path = require('path');
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'build.js',
    path: path.resolve(__dirname,'dist')
  },
  resolveLoader:{
    modules:['node_modules',path.resolve(__dirname,'loaders')]
    // 别名
    // alias:{
    //   loader1: path.resolve(__dirname, 'loaders', 'loader1.js')
    // }
  },
  devtool:'source-map',
  watch:true,
  module:{
    rules:[
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.jpg$/,
        // 目的就是根据图片生成一个md5 发射到dist目录下，file-loader还会返回当前的图片路径

        // url-loader 1） file-loader会处理路径
        use: {
          loader: 'url-loader',
          options:{
            limit:20*1024
          }
        }
      },
      {
        test:/\.js$/,
        use:{ /**珠峰*/
          loader: 'banner-loader',
          options:{
            text:'珠峰',
            filename:path.resolve(__dirname,'banner.js')
          }
        }
      }
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'babel-loader',
      //     options:{
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // }
    ]




    // loader的分类 pre 在前面的  post 在后面  normal

    // loader的顺序 pre + normal + inline + post
    // rules:[ // loader的顺序问题 从右向左 从下到上
    //   {
    //     test:/\.js$/,
    //     use:{
    //       loader:'loader1'
    //     },
    //     enforce:'pre'
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader2'
    //     }
    //   },
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: 'loader3'
    //     },
    //     enforce: 'post'
    //   }
    //   // {
    //   //   test:/\.js$/,
    //   //   use:['loader3','loader2','loader1']
    //   // }
    // ]
  }
}