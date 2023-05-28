setTimeout(() => {
  console.log("setTimeout")
}, 1000)
// queueMicrotask;这是一个微任务也可以传入一个回调
queueMicrotask(() => {
  console.log("queueMicrotask")
})
                  
Promise.resolve().then(() => {
  console.log("Promise then")
})

function foo() {
  console.log("foo")
}

function bar() {
  console.log("bar")
  foo()
}

bar()

console.log("其他代码")
