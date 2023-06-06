const path = require('path');
const SyncDonePlugin = require('./plugins/SyncDonePlugin');
const AsyncDonePlugin = require('./plugins/AsyncDonePlugin');
const AssetsPlugin = require('./plugins/AssetsPlugin');
const ZipPlugin = require('./plugins/ZipPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin');
const HashPlugin = require('./plugins/HashPlugin');
//page1 chunkhash 49eb
//page1 chunkhash 7d3e
//page1 chunkhash 49eb
module.exports = {
    mode:'development',
    devtool:false,
    entry:{
        page1:'./src/page1.js',
        page2:'./src/page2.js'
    },
    output:{
        hashSalt:'zhufeng',
        path:path.resolve(__dirname,'dist'),
        filename:'[name].[contenthash].js'
    },
    //外部引入
    /* externals:{
        //key是模块名称 值是window上的全局变量
        'jquery':"$"
    }, */
    devServer:{
        hot:false,
        overlay:false,
        hotOnly:true
    },
    plugins:[
        //new AsyncDonePlugin(),
        //new SyncDonePlugin(),
        //new AssetsPlugin(),
       /*  new ZipPlugin({
            filename:'assets.zip'
        }) */
        new HashPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
       /*  new AutoExternalPlugin({
            //key是模块的名称 值是一个对象 expose 此CDN脚本向window挂的变量名 url此CDN的路径
            jquery:{
                variable:'$',
                url:'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
            },
            lodash:{
                variable:'_',
                url:'https://cdn.bootcdn.net/ajax/libs/lodash.js/0.1.0/lodash.js'
            }
        }) */
    ]
}