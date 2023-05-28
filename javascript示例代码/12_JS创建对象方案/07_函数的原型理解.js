function foo() {
}

// 函数也是一个对象
// console.log(foo.__proto__) // 函数作为对象来说, 它也是有[[prototype]] 隐式原型

// 函数它因为是一个函数, 所以它还会多出来一个显式原型属性: prototype
// 后面我们知道，函数的在作为构造函数时他会把构造函数创造出来的对象的隐式原型执行函数的显式原型
console.log(foo.prototype)

var f1 = new foo()
var f2 = new foo()

console.log(f1.__proto__ === foo.prototype)
console.log(f2.__proto__ === foo.prototype)
