import { createApp } from 'vue'
import Hello from './vue_demo/Hello'

import "./utils/abc/cba/nba/why/test"

import { sum } from './utils/math'
import "./utils/demo.js"
// import "./component/cpns"

const message = "Hello World"

console.log(sum(20, 30))
console.log(sum(10, 12))

console.log(message.length)
console.log(sum(100, message.length))

const bar = () => {
  console.log("bar function execution~")
}

bar()
bar()

// Vue代码
createApp(Hello).mount("#app")

// 使用通过DefinePlugin注入的变量
console.log(coderwhy)
console.log(counter)

console.log(process.env.NODE_ENV)

console.log("aaaabbbbccccdddd")

console.log("Hello Codery")

// 指定哪一个模块需要HMR
// if (module.hot) {
//   module.hot.accept("./utils/math.js", () => {
//     console.log("math模块发生了刷新")
//   })
// }

if (module.hot) {
  module.hot.accept("./utils/demo.js", () => {
    console.log("demo模块发生了更新")
  })
}

