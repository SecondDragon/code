// Symbol 基本数据类型 string number boolean undefined null symbol bigint

// Symbol 独一无二的类型

let s1 = Symbol('jw');
let s2 = Symbol('jw');
// console.log(s1 === s2); 

// code runner

// 对象key来使用
let obj = {
    name:'zf',
    age:12,
    [s1]: 'ok'
}
// console.log(obj);

for(let key in obj){ // Symbol属性默认是不能枚举
    console.log(obj[key]);
}
console.log(Object.getOwnPropertySymbols(obj)); // 获取所有symbol
console.log(Object.keys(obj)); // 获取普通类型的key

let s3 = Symbol.for('jw'); // 声明全新的 
let s4 = Symbol.for('jw') // 把之前声明的拿过来用 
console.log(s3 === s4)

// 元编程的能力 -》 可以改写语法本身

// typeof 判断类型 基本类型   判断类型时 Object.prototype.toString.call()
// instanceof  constructor
let obj1 = {
    [Symbol.toStringTag]:'jw'
}
console.log(Object.prototype.toString.call(obj1))

// 隐式类型转化
let obj = {
    [Symbol.toPrimitive](type){
        return '123'
    }
};
console.log(obj + '1');


let instance = {
    [Symbol.hasInstance](value){
        return 'name' in value
    }
}
console.log({name:'zf'} instanceof instance); // __proto__ 自己实现一个instanceof


// Symbol() 创建独一无二的类型
// Symbol.toStringTag Symbol.toPrimitive
// Symbol.iterator


