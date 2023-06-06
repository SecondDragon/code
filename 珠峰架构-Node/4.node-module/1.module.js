// node中模块  es6Module  commonjs规范 两种规范 
// 用webpack 打包后 es6Module -》 commonjs模块 （tree-shaking）
// es6"静态"模块 (tree-shaking) 可以在编译的时候进行分析  "动态"模块  在代码执行的时候引入模块 (无法做tree-shaking)


// commonjs模块规范
// 1.每个文件都是一个模块 （每个模块外面都有一个函数）
// 2.文件需要被别人所使用 需要导出 module.exports = xxx
// 3.如果需要使用别人 那就需要require语法

// 模块的分类 1.核心模块、内置模块（node中自带的模块  fs http,vm....）
// 2.第三方模块 （使用别人的模块需要安装 co）
// 3.文件模块 别人引用的时候需要通过相对路径或者绝对路径来引用

// fs path vm 内置的模块
// 什么时候用同步？  什么时候用异步？ 当代已经在运行状态下了，尽量少使用同步 （阻塞）
/*
const fs = require('fs'); // require内部就是使用readFileSync来实现的

// 读取文件如果文件不存在会发生异常
let r = fs.readFileSync('./第一次作业1.js', 'utf8')
let exists = fs.existsSync('./第一次作业.js'); // 此方法的异步的方法被废弃了
*/

/*
const path = require('path'); // resolve,join
console.log(path.resolve(__dirname, 'a', 'b', 'c')); // 解析绝对路径, 解析默认采用 process.cwd() 如果有路径/ 会回到根目录
console.log(path.join(__dirname,'a', 'b', 'c')); // 仅仅是拼接，不会产生绝对路径，遇到/ 也会拼在一起
console.log(path.extname('a.min.js'));
console.log(path.basename('a.js','s')); 
console.log(path.relative('a/b/c/1.js','a')); // 根据路径获取相对路径
console.log(path.dirname('a/b/c')); // 取当前文件的父路径   __dirname的实现 就是path.dirname
*/

// 字符串如何能变成js来执行？
// eval 会受执行环境影响 
// new Function “模板引擎的实现原理”  可以获取全局变量，还是会有污染的清空
// node中自己实现了一个模块 vm  不受影响 （沙箱环境）  快照（执行前记录信息，执行后还原信息）  proxy来实现



// new Function('b','console.log(a,b)')('b');
const vm  =require('vm');
vm.runInThisContext(`console.log(a)`); // 在node中全局变量是在多个模块下共享的, 所以不要通过global来定义属性


// 们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量


// 全局 1个上下文 global.xxx
    // function (exports,module,require,__direname,filename){ var a = 100}
    // runInThisContext 和 new Function 对不 不需要产生函数
// runInNewContext

// require的实现 1.读取文件  2.读取到后给文件包装一个函数  3.通过runInThisContext 将他变成js语法 4.调用