// 1.基础类型

// 最基本的类型有 数字 字符串 布尔

// 所有的类型都在冒号的后面,ts的核心一切都以安全为准
// 什么时候可以不用类型，推倒

// number 和 大Number的区别  js特性  装箱的概念 xxx.xxx
let num1: number = 1;
let num2: Number = 1; // 用来描述实例的 类也可以当做类型
let num3: number = Number(1)
let num4: Number = new Number(1);

// 最基本
let num: number = 1;
let str: string = 'zf';
let bool: boolean = true;


// 数组类型, 数组的概念：一类类型的集合
const arr1: number[] = []
const arr2: (number | string)[] = ['a', 1]; // 并集的含义
// 如果数组里放的内容 就是无规律的, 有规律的数组 
const arr3: any[] = ['', 1, {}];
const arr4: Array<boolean> = [true, false];

// interface Array<T>{
//     [key:number]:T
// }


// 元组  ts中自己实现的  内容固定  类型固定 
const tuple: [string, boolean, number] = ['a', true, 1]; // 初始化 必须按照要求填入数据
let r = tuple.pop()
tuple.push('str', 1, 2, 3);// 在放入的时候 可以放入元组中定义的类型
// tuple[3] = 100; // 不能通过索引更改元组

// 数据交换 会用到元素  泛型

//枚举类型  ts最终编译成js 是没有类型的， 只是在开发时候使用的
// 普通枚举 异构枚举 常量枚举
const USER = Symbol('USER')
const ADMIN = Symbol('ADMIN')
const enum ROLE { // 大写是规范  加上const后 不会生成一个对象（更简洁）
    USER,
    ADMIN = 5,
    MANAGER
}
// 枚举可以支持反举 ，但是限于索引，会根据上一个人的值 进行自动的推断
// console.log(ROLE.USER)
// console.log(ROLE[0],ROLE)
console.log(ROLE.USER);


// null undefined  "是任何类型的子类型" 在严格模式下 undefined ->  undefined null -> null

let u: undefined = undefined
let n: null = null


// never 从不 代码无法达到终点，无法执行到结尾   "是任何类型的子类型"
// 出错 、 死循环 、永远走不到的判断

function setVal(val: string) {
    if (typeof val === 'string') {

    } else {
        val // never // 帮我们代码做完整校验 走不到else中 val就是never
    }
}
function throwError(): never {
    throw new Error()
}
// let xx = throwError();
function whileTrue(): never {
    while (true) { }
}

// void表示函数返回值的 也可以描述变量  void的值只能赋予null和undefined
// 严格模式下 不能把null 赋予给void类型
function getVoid(): void { // 接口中定义类中原型方法的void 表示不关心返回值类型，在实现的时候可以在次确定类型，函数是确定死了
    return 
}

//  void object 
// 非原始数据类型  
function create(obj: object) { // 后面泛型约束 会大量使用object类型

}
create({});
create(function () { })
create([]);


// Symbol  BigInt js的类型 用的不多

let s1: symbol = Symbol(1);
let s2: symbol = Symbol(2);
console.log(s1 === s2); // 不相等 es6 -》 es5

let max = Number.MAX_SAFE_INTEGER
let r1:bigint = BigInt(max);
console.log(BigInt(max) + BigInt(1) === BigInt(max) + BigInt(2))


// 数字 字符串 布尔  数组 元组 any never void null undefined 枚举


export { } // 防止模块间的数据共享类型


