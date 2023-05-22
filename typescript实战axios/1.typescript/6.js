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
    //关于继承跟静态没有关系，子类并不能继承父类的静态方法
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.getAge = function () {
            return '父类的age';
        };
        Animal.prototype.getName = function () {
            return '父亲的名称';
        };
        return Animal;
    }());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat() {
            return _super.call(this) || this;
        }
        Cat.prototype.getName = function () {
            //super=Animal.prototype
            return _super.prototype.getName.call(this) + '儿子的名称';
        };
        return Cat;
    }(Animal));
})(a || (a = {}));
