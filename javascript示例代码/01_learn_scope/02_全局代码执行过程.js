var name = "why"

console.log(num1)

var num1 = 20
var num2 = 30
var result = num1 + num2

console.log(result)

/**
 * 1.代码被解析,(此时代码尚未开始运行) v8引擎内部会帮助我们创建一个对象（全局对象）(GlobalObject -> go)，
 * 这个对象里会包含一些当前环境（node或者浏览器）所拥有的全局对象，
 * 例如 Math 、String、setTimeout、Date、console 等能直接在js代码中使用就是因为这些全局对象已经在go中了
 * 同时，如下globalObjec伪代码，go中还有一个window属性，window属性指向go对象本身，
 * 所以：console.log(window.window.window.window) 中的window.window.  无论点多少次，拿到的一直都是window本身
 * 
 * *******************************************************************************************************************************
 * 2.运行代码
 *    2.1. v8为了执行代码, v8引擎内部会有一个执行上下文栈(Execution Context Stack, ECStack)(函数调用栈)
 *         所有代码想要真正进行运行都必须放入ECStack中才能进行执行
 *          
 *    2.2. 因为我们执行的是全局代码, 为了全局代码能够正常的执行, 需要创建 全局执行上下文(Global Execution Context)(全局代码需要被执行时才会创建)
 */
var globalObject = {
  String: "类",
  Date: "类",
  setTimeount: "函数",
  window: globalObject,
  name: undefined,
  num1: undefined,
  num2: undefined,
  result: undefined
}

// console.log(window.window.window.window)
