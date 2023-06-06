
const webpack = require('webpack');
const options = require('./webpack.config.js');
/**
 * compiler就是编译器,它就是webpack打包的大管家
 */
const compiler = webpack(options);
//调用compiler的run方法开始编译
compiler.run((err,stats)=>{
    console.log(err);
    let result = stats.toJson({
        entries:true,//有哪些入口
        chunks:true,//产生了哪些代码块 
        module:true,//产生了哪些模块
        assets:true,//产了哪些资源
        files:true// 产生了哪些文件
    });
    console.log(JSON.stringify(result,null,2));
});