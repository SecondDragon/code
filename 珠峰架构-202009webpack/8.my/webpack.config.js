const path  = require('path');
module.exports = {
    context:process.cwd(),//当前的工作目录
    mode:'development',
    entry:'./src/index.js',
   /*  devtool:false,
    optimization:{
        splitChunks: {
            chunks: "all",
            minSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }, */
    /* entry:{
        page1:'./src/page1.js',
        page2:'./src/page2.js'
    } */
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        chunkFilename:'[name].js'
    },
    //自定义查找loader模块路径
    resolveLoader:{
        modules:['loaders','node_modules']
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:['style-loader','less-loader']
            }
        ]
    }
}