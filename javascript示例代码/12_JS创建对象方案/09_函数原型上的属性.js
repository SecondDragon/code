function foo() {

}

// 1.constructor属性
// foo.prototype这个对象中有一个constructor属性，但是他的属性描述符中设定了不可枚举，故无法打印出来
console.log(foo.prototype)

// 这样就能打印出对象的constructor属性的属性描述符了
console.log(Object.getOwnPropertyDescriptors(foo.prototype))


// Object.defineProperty(foo.prototype, "constructor", {
//   enumerable: true,
//   configurable: true,
//   writable: true,
//   value: "哈哈哈哈"
// })

console.log(foo.prototype)

// prototype.constructor = 构造函数本身
// 虽然不可枚举，但取值是可以取到的
// console.log(foo.prototype.constructor) // [Function: foo]
// console.log(foo.prototype.constructor.name)

console.log("22222222222222222",foo.prototype.constructor.prototype.constructor.prototype.constructor)

// 2.我们也可以添加自己的属性
// foo.prototype.name = "why"
// foo.prototype.age = 18
// foo.prototype.height = 18
// foo.prototype.eating = function() {

// }

var f1 = new foo()
console.log(f1.name, f1.age)


// 3.直接修改整个prototype对象
foo.prototype = {
  // constructor: foo,
  name: "why",
  age: 18,
  height: 1.88
}

var f1 = new foo()

console.log(f1.name, f1.age, f1.height)

// 真实开发中我们可以通过Object.defineProperty方式添加constructor
Object.defineProperty(foo.prototype, "constructor", {
  enumerable: false,
  configurable: true,
  writable: true,
  value: foo
})


