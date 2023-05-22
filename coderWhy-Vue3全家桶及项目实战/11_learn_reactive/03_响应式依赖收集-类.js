class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.push(fn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


const obj = {
  name: "why",
  age: 18
}


// 设置一个专门执行响应式函数的一个函数
const dep = new Depend()
function watchFn(fn) {
  dep.addDepend(fn)
  fn()
}

watchFn(function foo() {
  console.log("foo:", obj.name)
  console.log("foo", obj.age)
  console.log("foo function")
})


watchFn(function bar() {
  console.log("bar:", obj.name + " hello")
  console.log("bar:", obj.age + 10)
  console.log("bar function")
})

// 修改obj的属性
console.log("name发生变化-----------------------")
obj.name = "kobe"
dep.notify()

console.log("age发生变化-----------------------")
dep.notify()

console.log("name发生变化-----------------------")
obj.name = "james"
