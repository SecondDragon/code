// 深拷贝 和 浅拷贝 

let o1 = {name:'zf'};
let o2 = {age:{n:12}};

let assgin = {...o1,...o2};

o2.age.n = 13
console.log(assgin) // 默认只展开对象的第一层  Object.assign, 如果只有一层那就

console.log(JSON.stringify({a:/\d+/,nu:null,un:undefined,fn:function(){}}))


// 把对象上的每个属性 都拷贝一下  深拷贝 递归对象去拷贝， 利用栈
// let obj = {name:{n:'xxx'}}
// typeof instanceoce toString constructor
function deepClone(obj,hash = new WeakMap()){// vue3  记录拷贝前和拷贝后的对应关系 
    if(obj == null) return obj;
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    // ....
    if(typeof obj !== 'object') return obj;
    // 对象类型 obj  数组 ：[] 和 对象: {}

    if(hash.has(obj)) return hash.get(obj); // 返回上次拷贝的结果 不在递归了

    const copy = new obj.constructor;
    hash.set(obj,copy); // 引用类型 
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            copy[key] = deepClone(obj[key],hash)
        }
    }
    return copy
}
// 如果拷贝过的对象 不需要再次拷贝
var obj1 = {a:"1"};
obj1.b = {};
obj1.b.a = obj1.b;
console.log(deepClone(obj1))