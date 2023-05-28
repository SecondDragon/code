// var obj1 = {} // 创建了一个对象
// var obj2 = new Object() // 创建了一个对象

// function Person() {

// }

// var p = new Person()

var obj = {
  name: "why",
  age: 18
}

var obj2 = {
  // address: "北京市"
}
obj.__proto__ = obj2

// Object.prototype
// console.log(obj.__proto__)
// console.log(Object.prototype)
// console.log(obj.__proto__ === Object.prototype)

// Object 其实就是一个函数，

console.log(Object.prototype)
console.log(Object.prototype.constructor)//指向object函数
console.log("顶层原型的原型",Object.prototype.__proto__) //打印null,即最顶层原型的__proto__是会是null

// 这样可以获得Object函数原型的所有属性
console.log(
  "Object函数原型",
  Object.getOwnPropertyDescriptors(Object.prototype)
);

