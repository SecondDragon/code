// 1. 手写 Object.create

function create(obj) {
    function F() {
    }
    F.prototype = obj
    return new F()
}
// 组合寄生式继承的实现




function Person(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
}

Person.prototype.running = function () {
    console.log("running~")
}

Person.prototype.eating = function () {
    console.log("eating~")
}

function Student(name, age, friends, sno, score) {
    Person.call(this, name, age, friends);
    this.sno = sno;
    this.score = score;
}
function inheritPrototype(SubType, SuperType) {

    SubType.prototype = create(SuperType.prototype)

    Object.defineProperty(SubType.prototype, "constructor", {
        enumerable: false,
        writable: true,
        configurable: true,
        // constructor指向构造函数的函数对象
        value: SubType,
    })
}
inheritPrototype(Student, Person)


Student.prototype.studying = function () {
    console.log("studying~")
}

var stu = new Student("why", 18, ["kobe"], 111, 100)
console.log(stu)
stu.studying()
stu.running()
stu.eating()