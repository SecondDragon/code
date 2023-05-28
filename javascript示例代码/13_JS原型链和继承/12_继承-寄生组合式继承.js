function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}


// 这就是一个原型式继承实现
// function inheritPrototype(SubType, SuperType) {
//   // 完美
//   // Object.create做的事情和createObject1、 createObject2一样，Object.create是后出的api
//   // var info = Object.create(SuperType.prototype)就是把SuperType.prototype当作info对象的隐式原型对象
//   // 这样我们就能创建一个原型对象是父类构造函数的显示原型对象的对象了，
//   // 只要把这个子类构造函数的显式原型对象赋值为该对象，就能实现一个完美的继承
//   SubType.prototype = Object.create(SuperType.prototype);

//   Object.defineProperty(SubType.prototype, "constructor", {
//     enumerable: false,
//     configurable: true,
//     writable: true,
//     value: SubType,
//   });
// }

function inheritPrototype(SubType, SuperType) {
  // 此处，子类构造函数的显式原型对象就指向了------（一个隐式原型对象指向父类构造函数的显式原型对象）的对象
  SubType.prototype = Object.create(SuperType.prototype);
  
  Object.defineProperty(SubType.prototype, "constructor", {
    enumerable: false,
    writable: true,
    configurable:true,
    // constructor指向构造函数的函数对象
    value: SubType,
  }); 
}
function Person(name, age, friends) {
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.running = function() {
  console.log("running~")
}

Person.prototype.eating = function() {
  console.log("eating~")
}


function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends);
  this.sno = sno;
  this.score = score;
}
// function Student(name, age, friends, sno, score) {
//   // 组合继承
//   Person.call(this, name, age, friends)
//   this.sno = sno
//   this.score = score
// }

inheritPrototype(Student, Person)

Student.prototype.studying = function() {
  console.log("studying~")
}

var stu = new Student("why", 18, ["kobe"], 111, 100)
console.log(stu)
stu.studying()
stu.running()
stu.eating()

console.log("函数对象的name:", stu.constructor.name);
// stu.constructor会去找Student的原型对象，现在经过了inheritPrototype，Student.prototype已经是一个新对象
// 如果没有如下的代码
// Object.defineProperty(SubType.prototype, "constructor", {
//   enumerable: false,
//   writable: true,
//   configurable: true,
//   // constructor指向构造函数的函数对象
//   value: SubType,
// }); 

// 那么新的显式原型对象就没有 constructor,会继续向上找，找到Person.prototype的constructor,最终会打印Person

// 有了如下代码，就会打印Studengt,这就是为什么要给生成的显式原型对象加constructor 指向构造函数
// Object.defineProperty(SubType.prototype, "constructor", {
//   enumerable: false,
//   writable: true,
//   configurable: true,
//   // constructor指向构造函数的函数对象
//   value: SubType,
// }); 
console.log("函数对象的name:",stu.constructor.name)

