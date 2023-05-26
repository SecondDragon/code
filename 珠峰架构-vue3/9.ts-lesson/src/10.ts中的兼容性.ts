// ts中的兼容性  我们希望类型可以相互赋值 

// 普通类型  接口、函数 、类.



// 1.基础类型的兼容性  默认情况下都是定义好类型后不能赋值给其他类型

type NumOrStr = number | string;
let numOrStr: NumOrStr = 'abc';  // | 表示大的类型  子类型 -> 父类型

// 检测方式 鸭子检测 只要叫声像鸭子 就是鸭子
type MyStr = { toString(): string }
let str: MyStr = 'hello'; // 多的条件可以赋予给少的条件 ， 一切都是为了安全

interface IVegetables {
    color: string,
    taste: string
}
// 2.interface ITomato{ // 将一个值赋予给了类型, 是不会出现兼容性的 要求必须满足这个接口，两个接口之间是存在兼容性问题的
//     color:string,
//     taste:string,
//     size:string
// }
// let vegetables!:IVegetables;
// let tomato!:ITomato

let vegetables: IVegetables;
let tomato = {
    color: 'red',
    taste: 'sour',
    size: 'big'
}
vegetables = tomato;  // 通过接口的兼容性 可以处理赋予多的属性


// 3.函数兼容性 (1)函数的参数 和返回值  类型的兼容 类型的赋值可能会发生兼容性处理

// 针对参数的个数 和 返回值类型
// let sum1 = (a: string, b: string): string => a + b
// let sum2 = (a: string): string => a

// sum1 = sum2; // 我运行你传递两个参数 ，但是你传递了一个  我只能传递一个，你给了我二个

function forEach<T>(arr: T[], cb: (item: T, index: number, arr: T[]) => void) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i, arr);
    }
}
forEach([1, 2, 3, 4], (item) => {
    console.log(item);
})

type sum1 = (a: string, b: string) => { name: string };
type sum2 = (a: string) => { name: string, age: number }
let sum1!: sum1;
let sum2!: sum2;

sum1 = sum2;

// 针对参数的类型做兼容性处理   --》 ts中的
// 逆变 和 协变 函数的参数是逆变的可以传父类  函数的返回值是协变的可以返回子类
// 传逆父 返协子  考虑兼容性

class Parent {
    money!: string
}
class Child extends Parent {
    house!: string
}
class Grandson extends Child {
    eat!: string
}
// 对于参数而言 儿子可以处理 钱和房子
function getFn(cb: (person: Child) => Child) {

   
}
// Child Parent =>    Child Grandson
getFn((person: Parent) => new Grandson);  // 对于parent而言只有money  但是对于child -》 money和source


// 函数的参数是联合类型的时候 
function getType(cb: (val: string | number) => string | number) {
    cb('123')
}
getType((val: string|number|boolean ) => { //  string|number|boolean = val:string|number
    return 123
})
// 1.并集 可以用少的 付给多的  string | number  => number、string
// 2.多的属性可以赋予给少的属性
// 3.函数的参数个数少的可以赋予给个数多的

export { }