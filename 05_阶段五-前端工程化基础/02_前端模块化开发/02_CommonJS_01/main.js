// 1.直接获取导出的对象, 从对象中获取属性
// const util = require("./util.js")

// console.log(util.UTIL_NAME)
// console.log(util.formatCount())
// console.log(util.formatDate())

// 2.导入对象之后, 直接对其进行解构
// const { 
//   UTIL_NAME,
//   formatCount, 
//   formatDate 
// } = require("./util.js")

// console.log(UTIL_NAME)
// console.log(formatCount())
// console.log(formatDate())


// 3.探讨require的本质
const bar = require("./bar.js")
console.log(bar.name) // bar

// 4s之后重新获取name
// setTimeout(() => {
//   console.log(bar.name)
// }, 4000)

// 2s之后通过bar修改了name
setTimeout(() => {
  bar.name = "kobe"
}, 2000)
