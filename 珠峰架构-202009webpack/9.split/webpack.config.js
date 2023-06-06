const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'development',
    devtool:false,
    //MPA多页应用 多入口
    entry:{
        page1:'./src/page1.js',
        page2:'./src/page2.js'
    }, 
    //配置如何优化
    optimization:{
        //设置代码块的分割方案
        splitChunks:{
            chunks:'all',//同时分割同步和异步,默认只分割异步
            minSize:0, //被提供的代码的大小,默认是30K
            //要分割哪些代码块  initial=是同步 require import xx/async import('yy') all=initial+async 
            //page1~page2
            automaticNameDelimiter:"~",
            maxAsyncRequests: 3,//同一个入口分割出来的最大异步请求数
            maxInitialRequests: 5,//同一个入口分割出来的最大同步请求数
            name:true,//设置代码块打包后的名称,默认名称是用分隔符~分隔开的原始代码块
            //缓存组 设置不同的缓存组来抽取满足不同规则的chunk.
            //webpack里面还有一些默认缓存组,它的优先级是0
            cacheGroups:{
                 //第三方 提供者
                vendors:{//把符合条件的缓存组提取出来放在vendor这个代码块里
                    test: /[\\/]node_modules[\\/]/,//模块路径里有node_modules的话
                    priority: -10,
                    name:'vendors'
                },
                //提供不同的代码块之间的公共代码
                //commons~page1~page2.js
                default:{
                  minChunks:2,//如果这个模块被2个或2个以上的代码块引用了,就可以单独提取出来
                  priority:-20,
                  name:'commons'
                }
            }
        },
        ///runtimeChunk:false
    },
    plugins:[
       /*  new HtmlWebpackPlugin({
                template:'./src/index.html',
                chunks:["page1"],
                filename:'page1.html'
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            chunks:["page2"],
            filename:'page2.html'
       }),
       new HtmlWebpackPlugin({
           template:'./src/index.html',
           chunks:["page3"],
           filename:'page3.html'
      }),
      new HtmlWebpackPlugin({
          template:'./src/index.html',
          chunks:["page4"],
          filename:'page4.html'
     }) */
    ]
}