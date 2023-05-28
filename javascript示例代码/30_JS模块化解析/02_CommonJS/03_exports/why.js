const name = "why"
const age = 18
function sum(num1, num2) {
  return num1 + num2
}

// 源码中 当遇见 exports.name=name 这里的导出方式的时候 其实 是 底层先 写了个 module.exports= {}  exports= module.exports 
// module.exports = {}
// exports = module.exports

// 第二种导出方式
// exports.name = name
// exports.age = age
// exports.sum = sum

// 这种代码不会进行导出 因为 他把 exports 指向的对象改了 导出的 对象 一定是 module.exports
// exports = {
//   name,
//   age,
//   sum
// }

// 这种代码不会进行导出
// exports.name = name
// exports.age = age
// exports.sum = sum

module.exports = {

}

// 最终能导出的一定是module.exports

