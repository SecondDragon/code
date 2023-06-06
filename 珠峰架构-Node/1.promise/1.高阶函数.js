// 高阶函数的概念： 1.一个函数返回一个函数  2. 一个函数可以参数接受一个函数 高阶函数
// 这两个条件满足任何一个均可 promise内部肯定也是回调函数 （内部包含着高阶函数）


// 扩展方法 会用到高阶函数 

function core(...args){ // 核心代码
    // ....
    console.log('core',args);
    // ....
}

// 给core函数增加一些额外的逻辑 但是不能更改核心代码

Function.prototype.before = function (cb) {
    // this = core
    return (...args) =>{ // newCore  剩余运算符 可以把多个参数转化成数组
        cb();
        this(...args); // 拓展运算符
    }
}
let newCore = core.before(()=>{
    console.log('before')
})
newCore('a','b');

// 1.如果我们想给函数进行扩展 可以使用高阶函数
// 什么叫闭包？
// 函数的定义是有作用域的概念 ，一个函数定义的作用域和执行的作用域不在同一个 肯定会出现闭包

