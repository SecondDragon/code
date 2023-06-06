const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode:'production',//选择生产环境的话,会默认进行压缩
    devtool:false,
    //MPA多页应用 多入口
    entry:'./src/index.js', 
   /*  entry:{
        k1:'./src/k1.js',
        k2:['m1','m2']
    }, */
    output:{
       filename:'[name].js',
       chunkFilename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                //1.modules:false告诉 babel不要转换模块代码
                                ["@babel/preset-env",{modules:false}]
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,//收集CSS内容
                    "css-loader"
                ]
            }
        ]
    },
    plugins:[
        //contenthash 只跟内容有关系,只要内容不变,它就不变
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash:5].css',//负责写入文件
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            inject:'head'
        })
    ]
}