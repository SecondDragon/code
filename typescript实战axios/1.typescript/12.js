"use strict";
var a;
(function (a) {
    var p = {
        name: 'zhufeng',
        fly: function () { },
        eat: function () { }
    };
})(a || (a = {}));
var b;
(function (b) {
    // typeof 可以获取一个变量的类型
    /* type Person = {
        name: string;
        age: number
    } */
    var p = {
        name: 'zhufeng',
        age: 10
    };
    var p2 = {
        name: 'zhufeng',
        age: 20
    };
    var myname = 'fe';
    var mylevel = 10;
    function getValueByKey(val, key) {
        return val[key]; //xx
    }
    var person3 = {
        name: 'zhufeng',
        age: 10,
        gender: 'male',
    };
    var name = getValueByKey(person3, 'name');
    console.log('name', name);
    var p4 = {
        name: 'zhufeng',
        age: 10,
    };
    var p5 = {
        name: 'zhufeng',
        age: 10,
        gender: 'male'
    };
    var p6 = {
        name: 'zhufeng',
        age: 10,
        gender: 'male'
    };
    /*  interface PickPerson {
         name: string;
     } */
    var x = {
        name: 'name'
    };
    var a = typeof x;
})(b || (b = {}));
