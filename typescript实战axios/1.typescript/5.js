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
var a;
(function (a) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cat.prototype.getName = function () {
            return this.name;
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.name = '猫';
    console.log(cat.getName());
    var point = { x: 0, y: 0 };
    //类可以实现多个接口，但只能继承一个父类
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.speak = function () { };
        Person.prototype.eat = function () { };
        return Person;
    }());
})(a || (a = {}));
var b;
(function (b) {
    //重写 子类重新实现并覆盖父类中的方法
    var Animal = /** @class */ (function () {
        function Animal(name) {
            this.name = name;
        }
        Animal.prototype.speak = function () {
            console.log('动物叫');
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name) {
            return _super.call(this, name) || this;
        }
        Cat.prototype.speak = function () {
            console.log('我们一起喵喵喵');
            _super.prototype.speak.call(this);
        };
        return Cat;
    }(Animal));
    var cat = new Cat();
    cat.speak();
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.speak = function () {
            console.log('我们一起汪汪汪');
            _super.prototype.speak.call(this);
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.speak();
})(b || (b = {}));
