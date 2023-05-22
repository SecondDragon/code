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

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      dep.notify()
    },
    get: function() {
      return value
    }
  })
})


// 方式二: new Proxy() -> Vue3


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

console.log("age发生变化-----------------------")
obj.age = 20

console.log("name发生变化-----------------------")
obj.name = "james"

