function Person() {

}

var p = new Person()

console.log(p instanceof Person)

// Person.prototype.isPrototypeOf(p)   代码的意思是 Person.prototype 这个对象 是否在 对象p的原型链上
console.log(Person.prototype.isPrototypeOf(p))

// 
var obj = {
  name: "why",
  age: 18
}

var info = Object.create(obj)

// console.log(info instanceof obj)
console.log(obj.isPrototypeOf(info))


// instanceof 必须有构造函数 然后 检验 构造函数的原型对象是否在 某个对象的原型链上
// console.log(info instanceof obj) 这行代码 就会报错 因为 obj是个对象而不是一个函数
console.log(info instanceof obj);
// isPrototypeOf 而isPrototypeOf 则是 检验 某个对象是否在参数对象的原型链上， 不需要构造函数
console.log( obj.isPrototypeOf(info));