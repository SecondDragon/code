"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var name = 'zhufeng';
var age = 10;
var married = true;
var hobbies = ['1', '2', '3'];
var interests = ['4', '5', '6'];
//元组 类似一个数组 它是一个长度和类型都固定的数组
//1 长度固定 2 类型可以不一样 
var point = [100, 100];
point[0], point[1];
var person = ['zhufeng', 10];
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log("\u674E\u96F7\u662F" + Gender.BOY);
console.log("MM\u662F" + Gender.GIRL);
/* var Gender2;
(function (Gender) {
    Gender2[Gender2["BOY"] = 0] = "BOY";
    Gender2[Gender2["GIRL"] = 1] = "GIRL";
})(Gender2 || (Gender2 = {}));
console.log("\u674E\u96F7\u662F" + Gender2.BOY);
console.log("MM\u662F" + Gender2.GIRL); */
var Gender2 = {
    0: "BOY",
    1: "GIRL",
    "BOY": 0,
    "GIRL": 1
};
var s = Symbol.for('xx');
//数字 字符串 它的值可能会写
var person2 = {
    gender: Gender.BOY
};
var Week;
(function (Week) {
    Week[Week["MONDAY"] = 1] = "MONDAY";
    Week["TUESDAY"] = "y";
})(Week || (Week = {}));
console.log(Week.TUESDAY);
console.log(0 /* Red */, 1 /* Yellow */, 2 /* Blue */);
//任意类型 anyscript
// 第三库没有类型定义 类型转换的时候 数据结构太复杂太灵活 any
//ts 为 dom提供了一整套的类型声明
/* let root: HTMLElement | null = document.getElementById('root');
root!.style.color = 'red';//!断言不为空
 */
//null undefined
// null 空  undefined 未定义
//它们都其它类型的子类型 你可以把它们赋给其它类型的变量
var myname1 = null;
var myname2 = undefined;
var x;
x = 1;
x = undefined;
x = null;
// void类型 空的 没有 
function greeting(name) {
    console.log("hello " + name);
    return null;
}
greeting('zhufeng');
//never 永远不
//never是其它类型的子类型，代表不会出现的值
//A function returning 'never' cannot have a reachable end point
//在函数内部永远会抛出错误，导致函数无法正常结束
function createError(message) {
    console.log(1);
    throw new Error('error');
    console.log('end point');
}
function sum() {
    while (true) {
        console.log('hello');
    }
    console.log('end point');
}
//| 和 || ，& 和 && 的区别
var num1 = 3 | 5;
console.log(num1);
var num2 = 3 || 5;
console.log(num2);
var num3 = 3 & 5;
console.log(num3); //1
var num4 = 3 && 5;
console.log(num4); //5
var num;
//推论 猜
var name2 = 2;
name2 = 3;
name2 = 4;
var name3;
name3 = 4;
name3 = 'zhufeng';
//包装对象  java装箱和拆箱 c#
//自动在基本类型的对象类型之间切换
//1.基本类型上没有方法
//2.在内部迅速的完成一个装箱的操作，把基本类型迅速包装成对象类型，然后用对象来调用方法
var name4 = 'zhufeng';
//name4.toLocaleLowerCase();
var name44 = new String(name4);
name44.toLocaleLowerCase();
//let isOk1: boolean = true;
//let isOk2: boolean = Boolean('xx');
//let isOk3: boolean = new Boolean(1);
var name5;
name5 = 'zhufeng';
name5.toLowerCase();
name5 = 5;
name5.toFixed(3);
/* let name7: string | number = 1;
let name6: string | number = name7;
(name6 as string).toLowerCase();
(name6 as number).toFixed(2);
 */
//字面量类型
var Gender4;
Gender4 = 'Boy';
Gender4 = 'GIRL';
