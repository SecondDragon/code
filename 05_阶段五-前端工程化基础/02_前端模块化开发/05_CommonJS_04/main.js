
// 1.结论一: 当一个模块被引入(导入), 模块中的代码会被执行一次
// console.log("--------")

// const foo = require("./foo")

// console.log("++++++++")

// 2.结论二: 当一个模块被多次引入时, 模块中的代码只会执行一次
// const foo2 = require("./foo")
// const foo3 = require("./foo")
// const foo4 = require("./foo")
// const foo5 = require("./foo")
// const foo6 = require("./foo")

// 3.结论三: 如果有循环引入, 那么执行顺序: 深度优先算法(图结构)
// 数组结构/链表结构/树结构
console.log("main")
require("./aaa")
require("./bbb")

