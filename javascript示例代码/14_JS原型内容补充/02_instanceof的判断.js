function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType) {
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: SubType
  })
}


function Person() {

}

function Student() {

}

inheritPrototype(Student, Person)

console.log(Person.prototype.__proto__)

var stu = new Student()

// stu instanceof Student;  instanceof的作用是确定 Student 这个构造函数的原型是否出现在 stu这个对象的原型链上
console.log(stu instanceof Student) // true


console.log(stu instanceof Person) // true
console.log(stu instanceof Object) // true


function myInstanceOf(instance, Type) {
  
  let prototype = Type.prototype
  let proto = Object.getPrototypeOf(instance)
  while (true) { 
    if (prototype === proto) {
      return true
    }
    if (proto === null) {
      return false
    }
    proto = Object.getPrototypeOf(proto);
  }
  
}

console.log(myInstanceOf(stu, Person) ) // true
console.log(myInstanceOf(stu, Object) ) // true


let a = [1, 23, 3, 4, 5]
console.log(myInstanceOf(a, Date)) // true