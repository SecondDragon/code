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

function Animal() {
}
Animal.prototype.getName = function () {
    return '父亲的名称';
};
__extends(Cat, Animal);
function Cat() {
    return _super !== null && _super.apply(this, arguments) || this;
}
Cat.prototype.getName = function () {
    return Animal.prototype.getName.call(this) + '儿子的名称';
    //super.getName = Animal.prototype.getName
};

