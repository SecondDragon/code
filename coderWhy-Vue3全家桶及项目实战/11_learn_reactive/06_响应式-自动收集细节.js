class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  addDepend(fn) {
    if (fn) {
      this.reactiveFns.add(fn)
    }
  }

  depend() {
    if (reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}


// 设置一个专门执行响应式函数的一个函数
let reactiveFn = null
function watchFn(fn) {
  reactiveFn = fn
  fn()
  reactiveFn = null
}


// 封装一个函数: 负责通过obj的key获取对应的Depend对象
const objMap = new WeakMap()
function getDepend(obj, key) {
  // 1.根据对象obj, 找到对应的map对象
  let map = objMap.get(obj)
  if (!map) {
    map = new Map()
    objMap.set(obj, map)
  }

  // 2.根据key, 找到对应的depend对象
  let dep = map.get(key)
  if (!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}

const obj = {
  name: "why",
  age: 18,
  address: "广州市"
}

// 方案一: Object.defineProperty() -> Vue2
Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    set: function(newValue) {
      value = newValue
      const dep = getDepend(obj, key)
      dep.notify()
    },
    get: function() {
      // 拿到obj -> key
      // console.log("get函数中:", obj, key)
      // 找到对应的obj对象的key对应的dep对象
      const dep = getDepend(obj, key)
      // dep.addDepend(reactiveFn)
      dep.depend()

      return value
    }
  })
})


// 方式二: new Proxy() -> Vue3


// ========================= 业务代码 ========================
watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// watchFn(function() {
//   console.log(obj.address)
// })

// watchFn(function() {
//   console.log(obj.age)
//   console.log(obj.address)
// })

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"

