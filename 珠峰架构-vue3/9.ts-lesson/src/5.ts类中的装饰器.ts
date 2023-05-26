

// 装饰器 是一个实验性语法 后面会有改动 vue2 刚开始用的就是装饰器 

// 装饰器作用就是 扩展类  扩展类中的属性 和方法 , 不能修饰函数，函数会有变量提升的问题
function addSay1(val: string) { // 洋葱模型
    console.log(val)
    return function (target: any) {
        console.log(1)
    }
}
function addSay2(val: string) {
    console.log(val)
    return function (target: any) {
        console.log(2)
    }
}
function addSay3(val: string) {
    console.log(val)
    return function (target: any) {
        console.log(3)
    }
}
// @addSay1('a1')
// @addSay2('a2')
// @addSay3('a3')  // = addSay(Person);


function eat(target: any) { // target => 类
    target.prototype.eat = function () {
        console.log('eat')
    }
}
function toUpperCase(target: any, key: string) { // target => 类的原型, key就是修饰的属性
    let val: string = ''
    Object.defineProperty(target, key, { // 原型定义属性
        get() {
            return val.toUpperCase();
        },
        set(newVal: string) {
            val = newVal
        }
    })
}

function double(num: number) {
    return function (target: any, key: string) { // target => 类
        let v = target[key]
        Object.defineProperty(target, key, {
            get() {
                return num * v
            }
        })
    }
}

function Enum(bool: boolean) { // Object.definePropert(target,key ,descriptor)
    return function (target: any, key: string, descriptor: PropertyDescriptor) { // target=> 原型 
        descriptor.enumerable = bool
    }
}
function params(target: any, key: string, index: number) { // target 原型 key drinnk index => 0
    console.log(key, index)
}
// @eat
class Person {
    // eat!:()=>void
    @toUpperCase
    public name: string = 'jw';

    @double(3)
    static age: number = 18; // 静态的通过类来调用
    @Enum(false)
    // 还能修饰参数
    drink(@params content: any) { }
}
let p = new Person();
console.log(p.name)
console.log(p)

// 接口、泛型、类型保护、交叉类型


// 类型推断 类型兼容  条件 内置 自定义类型。。。。。 namespace 声明文件。。。

// 装饰器就是一个函数 ， 类：this  如果给this上赋予值 是无法自动推断的  this上的属性我也不知道你哪个用到了 tree-shaking



export {}