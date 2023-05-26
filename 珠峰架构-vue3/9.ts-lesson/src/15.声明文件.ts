// export import语法 ESModule
// require module.exports  commonjs


// rollup默认只支持es6语法 只有es6模块才能做treeshaking


// import a from  './cjs'
// import r  = require('fs'); // commonjs语法的require语法是没有类型提示的



// ts 为了支持commonjs语法 单独的提出了一个导出方式  export =  / import x = require('')
// 用ts的时候除非你引入的模块 他不是ts写的我们可以使用require 直接用
// 如果模块用ts写的 那就需要import x = require('xx')
// 如果要是es6模块 全部用 export default export {} / import 即可


// es6模块和commonjs模块不兼容  有可能人家的包是commonjs打包出的结果，es6引入会出问题
// 为了解决这个问题 才生成了新的语法export = 

// ---------------------------

// 有的时候在开发时引入了一些第三方模块 会发现他们不是ts写的

// declare module 'jquery';
import jquery from 'jquery';// 有个组织 @types/
// 通过declare来声明变量，这个声明只是为了避免报错的 没有任何意义


jquery.fn.extend()
jquery('xxx').height('100');


// import a from 'a.vue';

// let tomato:tomato = {
//     color:'red'
// }


// unknown 是any的安全类型

let u: unknown = 1; // unkown 不能通过属性变量取值 为了安全性

// unknown和其他类型在联合类型都是unknown类型
// unknow 和其他类型 交叉类型都是其他类型
type x = boolean & unknown

// keyof any 但是不能用 keyof unknown

type s = keyof any;




// 回顾了之前核心ts的api Omit Partial Exclude Extract...
// 命名空间 声明文件 模块导入导出 import export / export = import xx = 
// 声明文件的写法 declare(没有确切的含义 只是为了防止出错)，在写声明文件的时候 需要考虑合并问题


// export { } // 当前是一个独立的模块 

