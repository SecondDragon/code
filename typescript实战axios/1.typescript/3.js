"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//如何定义类
//Property 'name' has no initializer and is not definitely assigned 
//in the constructor.ts(2564)
var a;
(function (a) {
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng';
            this.age = 10;
        }
        return Person;
    }());
    var p1 = new Person();
    console.log(p1.name);
    console.log(p1.age);
})(a || (a = {}));
var b;
(function (b) {
    // 存取器 getter setter
    var Person = /** @class */ (function () {
        function Person(name) {
            this.myname = name;
        }
        Object.defineProperty(Person.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (newVal) {
                this.myname = newVal.toUpperCase();
            },
            enumerable: true,
            configurable: true
        });
        return Person;
    }());
    var p = new Person('zhufeng');
    console.log(p.name); //zhufeng
    p.name = 'jiagou';
    console.log(p.name);
})(b || (b = {}));
var c;
(function (c) {
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        return Person;
    }());
    var p = new Person('zhufeng');
    p.name = 'jiagou';
})(c || (c = {}));
//继承
/**
 * 子类继承父类后子类的实例上就拥有了父类中的属性和方法
 * 访问修饰符 public protected private
 * public 自己 自己的子类 和其它类都可能访问
 * protected 受保护的 自己和自己的子类能访问 ，其它 类不能访问
 * private 私有的 只能自己访问，自己的子类不能访问，其它更不行了
 */
var d;
(function (d) {
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.amount = 100;
        }
        Person.prototype.getName = function () {
            return this.name;
        };
        Person.prototype.setName = function (newName) {
            this.name = newName;
        };
        return Person;
    }());
    var Student = /** @class */ (function (_super) {
        __extends(Student, _super);
        function Student(name, age, stuNo) {
            var _this = _super.call(this, name, age) || this;
            _this.stuNo = stuNo;
            return _this;
        }
        Student.getType = function () {
            return Student.type;
        };
        Student.prototype.getStuNo = function () {
            return this.name + this.age + this.amount + this.stuNo;
        };
        Student.prototype.setStuNo = function (newStuNo) {
            this.stuNo = newStuNo;
        };
        Student.type = 'Student';
        return Student;
    }(Person));
    var s = new Student('zhufeng', 10, 1);
    console.log(s.name);
    console.log(s.age);
    console.log(s.amount);
    console.log(Student.type);
    Student.getType();
})(d || (d = {}));
