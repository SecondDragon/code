//Cannot redeclare block-scoped variable 'name'.
//如果代码里有export import 之类的代码，那么这个文件变成一个模块
//export { }
//在一个作用域 内部，相同的变量名只能声明一次
export { }
let name: string = 'zhufeng';
let age: number = 10;
let married: boolean = true;
let hobbies: string[] = ['1', '2', '3'];
let interests: Array<string> = ['4', '5', '6'];
//元组 类似一个数组 它是一个长度和类型都固定的数组
//1 长度固定 2 类型可以不一样 
let point: [number, number] = [100, 100];
point[0], point[1];
let person: [string, number] = ['zhufeng', 10];

enum Gender {
    BOY,
    GIRL
}
console.log(`李雷是${Gender.BOY}`);
console.log(`MM是${Gender.GIRL}`);

/* var Gender2;
(function (Gender) {
    Gender2[Gender2["BOY"] = 0] = "BOY";
    Gender2[Gender2["GIRL"] = 1] = "GIRL";
})(Gender2 || (Gender2 = {}));
console.log("\u674E\u96F7\u662F" + Gender2.BOY);
console.log("MM\u662F" + Gender2.GIRL); */
let Gender2 = {
    0: "BOY",
    1: "GIRL",
    "BOY": 0,
    "GIRL": 1
}
let s = Symbol.for('xx');
//数字 字符串 它的值可能会写
let person2 = {
    gender: Gender.BOY
}
enum Week {
    MONDAY = 1,
    TUESDAY = 'y'
}
console.log(Week.TUESDAY);
//常数枚举
const enum Colors {
    Red,
    Yellow,
    Blue
}
console.log(Colors.Red, Colors.Yellow, Colors.Blue);

//任意类型 anyscript
// 第三库没有类型定义 类型转换的时候 数据结构太复杂太灵活 any
//ts 为 dom提供了一整套的类型声明
/* let root: HTMLElement | null = document.getElementById('root');
root!.style.color = 'red';//!断言不为空
 */
//null undefined
// null 空  undefined 未定义
//它们都其它类型的子类型 你可以把它们赋给其它类型的变量
let myname1: string | null = null;
let myname2: string | undefined = undefined;

let x: number | null | undefined;
x = 1;
x = undefined;
x = null;

// void类型 空的 没有 
function greeting(name: string): null | void {
    console.log(`hello ${name}`);
    return null;
}
greeting('zhufeng');

//never 永远不
//never是其它类型的子类型，代表不会出现的值
//A function returning 'never' cannot have a reachable end point
//在函数内部永远会抛出错误，导致函数无法正常结束
function createError(message: string): never {
    console.log(1);
    throw new Error('error');
    console.log('end point');
}
function sum(): never {
    while (true) {
        console.log('hello');
    }
    console.log('end point');
}
//| 和 || ，& 和 && 的区别
let num1 = 3 | 5;
console.log(num1);
let num2 = 3 || 5;
console.log(num2);
let num3 = 3 & 5;
console.log(num3);//1
let num4 = 3 && 5;
console.log(num4);//5

let num: string | number
//推论 猜
let name2 = 2;
name2 = 3;
name2 = 4;
let name3;
name3 = 4;
name3 = 'zhufeng';

//包装对象  java装箱和拆箱 c#
//自动在基本类型的对象类型之间切换
//1.基本类型上没有方法
//2.在内部迅速的完成一个装箱的操作，把基本类型迅速包装成对象类型，然后用对象来调用方法
let name4: string = 'zhufeng';
//name4.toLocaleLowerCase();
let name44 = new String(name4);
name44.toLocaleLowerCase();

//let isOk1: boolean = true;
//let isOk2: boolean = Boolean('xx');
//let isOk3: boolean = new Boolean(1);


let name5: string | number;
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
let Gender4: 'Boy' | 'GIRL';
Gender4 = 'Boy';
Gender4 = 'GIRL';




