import { createApp } from 'vue'
import Hello from './vue_demo/Hello'

import "./utils/abc/cba/nba/why/test"

import { sum } from './utils/math'
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

console.log("aaaabbbb")
