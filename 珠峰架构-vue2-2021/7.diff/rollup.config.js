import babel from 'rollup-plugin-babel'
export default {
    input:'./src/index.js',
    output:{
        format:'umd', // 支持amd 和 commonjs规范 window.Vue
        name:'Vue',
        file:'dist/vue.js',
        sourcemap:true, // es5 -> es6源代码
    },
    plugins:[
        babel({ // 使用babel进行转化 但是拍出node_modules 文件
            exclude:'node_modules/**', // glob 语法
        })
    ]
}


// 后续 需要打包不同的类型 可以写个列表，循环打包