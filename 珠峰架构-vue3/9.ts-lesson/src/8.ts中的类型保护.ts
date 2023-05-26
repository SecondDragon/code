// 类型保护 主要靠js的特性  和ts自带的功能

// 1.typeof 区分类型保护变量 
function fn(val: string | number) {
    if (typeof val == 'string') {
        val.match
    } else {
        val.toFixed
    }
}

// 2.instanceof
class Person { eat() { } }
class Dog { }
const createClass = (clazz: new () => Person | Dog) => {
    return new clazz
}
let r = createClass(Person);
if (r instanceof Person) {
    r.eat // Person
} else {
    r // Dog
}

// 3.in语法
interface Fish {
    swiming: string
}
interface Bird {
    fly: string
}

function isFish(animal: Fish | Bird): animal is Fish {
    return 'swiming' in animal
}

function getAnimalType(animal: Fish | Bird) { // keyof 取得是类型
    if (isFish(animal)) {
        animal.swiming
    } else {
        animal.fly
    }
}

// 以上的情况都可以通过js来判断出来的 , 可以增加一个字面量类型来进行判断 可识别类型
interface IButton1 {
    color: 'blue'
    class: string
}
interface IButton2 {
    color: 'green'
    class: string
}
function getButton(button: IButton1 | IButton2) {
    if (button.color == 'blue') {
        button
    } else {
        button
    }
}
// is语法 用来定义自己的类型

function isString(val: any): val is string { // 根据函数的返回值确定是不是string类型
    // ts 是给代码的  js是自己的逻辑  ts不关心，ts只关心类型
    return Object.prototype.toString.call(val) == '[object String]'
}

// ts 语法 为了有类型提示 不会关心js怎么执行

// null保护  val!=null ! ? 

function getNum(val: number | null) {
    val = val || 0;
    val.toFixed // 明确出来是数字
    function inner() {
        //if(val !== null){ // 内层函数可能会判断不正常
        val?.toFixed()
        //}
    }
    inner();
}


// 代码的完整性保护  主要靠的是never 利用never无法到达最终结果的特性，来保证代码的完整
interface ISquare {
    kind: 'square',
    width: number
}
interface IRant {
    kind: 'rant',
    width: number,
    height: number
}
interface ICircle {
    kind: 'circle',
    r: number
}
const assert = (obj: never) => { throw new Error("err"); }
// 完整性保护 保证代码逻辑全部覆盖到
function getArea(obj: ISquare | IRant | ICircle) {
    switch (obj.kind) {
        case 'square':
            return obj.width * obj.width;
        case 'rant':
            return obj.width * obj.height;
        case 'circle':
            return
        default:
            assert(obj);
    }
}
getArea({ kind: 'circle', r: 10 });

// typeof instanceof in (ts 可识别类型 is语法 完整性保护 null保护)


export { }