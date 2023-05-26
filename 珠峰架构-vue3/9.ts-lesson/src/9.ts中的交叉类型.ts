// 交叉类型 = 交集 （和数学中有点差异）


interface Person1 {
    handsome: string,
    // a:string  如果两个类型不一致 则相交的结果是never
}
interface Person2 {
    height: string,
    // a:number
}

type Person3 = Person1 & Person2; // | 并集  & 交集  (交集可以理解成 涵盖所有属性)

let person: Person3 = {
    handsome: '帅',
    height: '高',
}

// 在原有的类型基础上想去扩展属性 可以用交叉类型
// ts的核心为了安全  交叉类型 可以赋予给没有交叉之前的类型

type Person4 = Person2 & { money: string }
let person4: Person4 = {
    ...person,
    money: '有钱'
}
let p: Person2 = person;



// 方法的mixin 默认推断会生成交集
function mixin<T extends object, K extends object>(o1: T, o2: K): T & K {
    return { ...o1, ...o2 }
}
// 我们后续真正合并属性的时候 要以一方为基础 不会直接相交，可能会导致never情况
// merge
let r = mixin({}, { address: 'xxx', name: 12 })


// 类型兼容？  哪些东西他有兼容的功能 
// 内置的类型的实现 -》 自定义一些类型
export { }