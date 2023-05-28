var obj = {
  name: "why",
  age: 18
}
// Object.create做的事情和createObject1、 createObject2一样，Object.create是后出的api
// var info = Object.create(obj)就是把obj当作info对象的隐式原型对象
// 这样我们就能创建一个原型对象是父类构造函数的显示原型对象的对象了，
// 只要把这个子类构造函数的显式原型对象赋值为该对象，就能实现一个完美的继承

// 这种继承仅局限于对象
// 仅仅局限于对象继承对象



var info = Object.create(obj)

// 原型式继承函数
function createObject1(o) {
  var newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}
// 这是在没有setPrototypeOf的时候使用的办法
function createObject2(o) {
  function Fn() {}
  Fn.prototype = o
  var newObj = new Fn()
  return newObj
}

// var info = createObject2(obj)
var info = Object.create(obj)
console.log(info)
console.log(info.__proto__)
