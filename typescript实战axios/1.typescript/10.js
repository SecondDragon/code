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
(function (a_1) {
    //类型保护 就是更精确的知道是哪种类型
    function double(input) {
        if (typeof input === 'string') {
            input.toLowerCase();
        }
        else if (typeof input === 'number') {
            input.toFixed(2);
        }
        else {
            input;
        }
    }
    var Animal = /** @class */ (function () {
        function Animal() {
            this.name = 'zhufeng';
        }
        return Animal;
    }());
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.swing = 2;
            return _this;
        }
        return Bird;
    }(Animal));
    function getName(a) {
        if (a instanceof Bird) {
            a.swing;
        }
        else {
            a.name;
        }
    }
    //null保护 
    function getFirstLetter(s) {
        /*  if (s === null) {
             s = '';
         } */
        //s = s || '';
        function ensure() {
            s = s || '';
        }
        ensure();
        return s.charAt(0); //非空断言
    }
    function getButton(button) {
        if (button.class === 'warning') {
            button.text1;
        }
        else {
            button.text2;
        }
    }
    function getNumber(x) {
        if ('swing' in x) {
            x.swing;
        }
        else {
            x.leg;
        }
    }
})(a || (a = {}));
//自定义的类型保护
var b;
(function (b) {
    function isBird(x) {
        return x.legs === 2;
    }
    function getAnimal(x) {
        if (isBird(x)) {
            //x就是一个鸟
            console.log(x.name1);
        }
        else {
            console.log(x.name2);
        }
    }
    var x = { name1: 'Bird', legs: 3 };
    getAnimal(x);
})(b || (b = {}));
