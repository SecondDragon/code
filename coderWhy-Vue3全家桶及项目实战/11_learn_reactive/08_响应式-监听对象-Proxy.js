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

// 方案一: Object.defineProperty() -> Vue2
// function reactive(obj) {
//   Object.keys(obj).forEach(key => {
//     let value = obj[key]
  
//     Object.defineProperty(obj, key, {
//       set: function(newValue) {
//         value = newValue
//         const dep = getDepend(obj, key)
//         dep.notify()
//       },
//       get: function() {
//         // 拿到obj -> key
//         // console.log("get函数中:", obj, key)
//         // 找到对应的obj对象的key对应的dep对象
//         const dep = getDepend(obj, key)
//         // dep.addDepend(reactiveFn)
//         dep.depend()
  
//         return value
//       }
//     })
//   })  
//   return obj
// }

// 方式二: new Proxy() -> Vue3
function reactive(obj) {
  const objProxy = new Proxy(obj, {
    set: function(target, key, newValue, receiver) {
      // target[key] = newValue
      Reflect.set(target, key, newValue, receiver)
      const dep = getDepend(target, key)
      dep.notify()
    },
    get: function(target, key, receiver) {
      const dep = getDepend(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    }
  })
  return objProxy
}


// ========================= 业务代码 ========================
const obj = reactive({
  name: "why",
  age: 18,
  address: "广州市"
})

watchFn(function() {
  console.log(obj.name)
  console.log(obj.age)
  console.log(obj.age)
})

// 修改name
console.log("--------------")
// obj.name = "kobe"
obj.age = 20
// obj.address = "上海市"


console.log("=============== user =================")
const user = reactive({
  nickname: "abc",
  level: 100
})

watchFn(function() {
  console.log("nickname:", user.nickname)
  console.log("level:", user.level)
})

user.nickname = "cba"

