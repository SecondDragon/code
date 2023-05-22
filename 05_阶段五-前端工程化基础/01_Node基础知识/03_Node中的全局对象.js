// console.log(window)

// 1.类似于window的全局对象
// console.log(global)


// 2.特殊的全局对象
// __dirname当前的文件所在的目录结构(重要)
console.log(__dirname)
// __filename当前目录+文件名称
console.log(__filename)


// 3.模块化时具体学习(重要)
// console.log(module)
// console.log(exports)
// console.log(require)


// 4.常见的全局对象(了解)
console.log(process)
console.log(process.argv)


// 5.定时器方法
// setTimeout(() => {
//   console.log("setTimeout")
// }, 2000);
// setInterval(() => {
//   console.log("setInterval")
// }, 3000)

// 额外补充: Immediate: 立即/立刻
setImmediate(() => {
  console.log("setImmediate")
})

// 额外执行函数
process.nextTick(() => {
  console.log("nextTick")
})


// 6.全局对象
console.log(global)
console.log(globalThis)
console.log(global === globalThis)

