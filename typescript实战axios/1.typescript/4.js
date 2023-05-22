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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var a;
(function (a) {
    function enhancer(target) {
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    }
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person = __decorate([
            enhancer
        ], Person);
        return Person;
    }());
    var p = new Person();
    console.log(p.xx);
    console.log(p.yy);
})(a || (a = {}));
//把类整个替换
var b;
(function (b) {
    function enhancer() {
        return function (target) {
            return /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1(name, age) {
                    return _super.call(this, name, age) || this;
                }
                class_1.prototype.getAge = function () {
                    console.log(this.age);
                };
                return class_1;
            }(Person));
        };
    }
    var Person = /** @class */ (function () {
        function Person(name, age) {
            this.name = 'person';
            this.age = 10;
            this.name = name, this.age = age;
        }
        Person = __decorate([
            enhancer()
        ], Person);
        return Person;
    }());
    var p = new Person('zhufeng', 10);
    p.name;
})(b || (b = {}));
//属性装饰器 装饰属性
var c;
(function (c) {
    //target如果装饰的是个普通属性的话，那么这个target指向类的原型 Person.prototype
    //target装饰的是一个类的属性static,那么这个target指定类的定义    
    function upperCase(target, propertyName) {
        var value = target[propertyName];
        var getter = function () { return value; };
        var setter = function (newVal) {
            value = newVal.toUpperCase();
        };
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    function propertyEnumerable(flag) {
        return function (target, methodName) {
        };
    }
    function methodEnumerable(flag) {
        return function (target, methodName, propertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        };
    }
    function setAge(age) {
        return function (target, methodName, propertyDescriptor) {
            target.age = age;
        };
    }
    function toNumber(target, methodName, propertyDescriptor) {
        var oldMethod = propertyDescriptor.value;
        propertyDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (item) { return parseFloat(item); });
            return oldMethod.apply(this, args);
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng';
        }
        Person.prototype.getName = function () {
            console.log('getName');
        };
        Person.getAge = function () {
        };
        Person.prototype.sum = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (accu, item) { return accu + item; }, 0);
        };
        __decorate([
            upperCase,
            propertyEnumerable(false)
        ], Person.prototype, "name", void 0);
        __decorate([
            methodEnumerable(true)
        ], Person.prototype, "getName", null);
        __decorate([
            toNumber
        ], Person.prototype, "sum", null);
        __decorate([
            setAge(100)
        ], Person, "getAge", null);
        return Person;
    }());
    var p = new Person();
    p.name = 'jiagou';
    console.log(p.name); //JIAGOU
    for (var attr_1 in p) {
        console.log('attr=' + attr_1);
    }
    console.log(Person.age);
    console.log(p.sum(1, '2', '3'));
})(c || (c = {}));
var d;
(function (d) {
    //Person.prototype login 1
    function addAge(target, methodName, paramsIndex) {
        console.log(target, methodName, paramsIndex);
        target.age = 10;
    }
    //参数装饰 方法参数
    var Person = /** @class */ (function () {
        function Person() {
        }
        Person.prototype.login = function (username, password) {
            console.log(this.age, username, password);
        };
        __decorate([
            __param(1, addAge)
        ], Person.prototype, "login", null);
        return Person;
    }());
    var p = new Person();
    p.login('zhufeng', '123');
})(d || (d = {}));
var e;
(function (e) {
    function Class1Decorator() {
        return function (target) {
            console.log("类1装饰器");
        };
    }
    function Class2Decorator() {
        return function (target) {
            console.log("类2装饰器");
        };
    }
    function MethodDecorator() {
        return function (target, methodName, descriptor) {
            console.log("方法装饰器");
        };
    }
    function Param1Decorator() {
        return function (target, methodName, paramIndex) {
            console.log("参数1装饰器");
        };
    }
    function Param2Decorator() {
        return function (target, methodName, paramIndex) {
            console.log("参数2装饰器");
        };
    }
    function PropertyDecorator(name) {
        return function (target, propertyName) {
            console.log(name + "属性装饰器");
        };
    }
    var Person = /** @class */ (function () {
        function Person() {
            this.name = 'zhufeng';
            this.age = 10;
        }
        Person.prototype.greet = function (p1, p2) { };
        __decorate([
            MethodDecorator(),
            __param(0, Param1Decorator()), __param(1, Param2Decorator())
        ], Person.prototype, "greet", null);
        __decorate([
            PropertyDecorator('name')
        ], Person.prototype, "name", void 0);
        __decorate([
            PropertyDecorator('age')
        ], Person.prototype, "age", void 0);
        Person = __decorate([
            Class1Decorator(),
            Class2Decorator()
        ], Person);
        return Person;
    }());
})(e || (e = {}));
//属性方法先执行，谁先写先执行谁
//方法的时候，先参数再方法，而且 他们一定会在一起
//最后是类
//如果是同类型的，先执行后写的
