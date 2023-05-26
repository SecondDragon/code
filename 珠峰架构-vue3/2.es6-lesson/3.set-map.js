// 数据类型 （去重） set：值不重复 map  -> weakMap weakSet

// 使用 、 区别

let set = new Set([1, 2, 1, 1, 2, 1, 1, 3, 'a']);
set.add({ a: 1 });
console.log(set.entries(set)); // Object.entries  Object.keys  Object.values
console.log(set.has(5))


let map = new Map([ // 不能有重复的key
    ['a', 1],
    ['v', 1],
    ['v', 1]
]) 
map.set({a:1},2);
// 他的key 可以使用对象类型 
console.log(map)


console.log(Object.prototype.toString.call(new Map()));
console.log(Object.prototype.toString.call(new Set()));


// 数组  交集 并集  差集
let arr1 = [1,2,3,4];
let arr2=  [3,4,5,6];


function union(arr1,arr2){
    // 内部他有Symbol.iterator方法
    let s = new Set([...arr1,...arr2]); // 集合 集合可以被迭代
    return [...s]
}
console.log(union(arr1,arr2))

function intersection(arr1,arr2){
    let s1 = new Set(arr1); // forEach 
    let s2 = new Set(arr2);

    return [...s1].filter(item=>{
        return s2.has(item)
    })

}
console.log(intersection(arr1,arr2))

// 得看谁减少谁 1 - 2 、 2 - 1
// weakMap 弱引用  垃圾回收 “标记引用”

class MyTest{};
let my = new MyTest(); // 对象
let map = new WeakMap(); // key 只能是对象

map.set(my,1);

my = null; // ?  当你给一个变量设置为null的时候 不会马上回收， 会在合适的机会自己情况 map 引用的对象 不会被回收掉  weakMap引用的对象被置为null 时，后续会被清空


