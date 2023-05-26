// reduce 收敛函数  可以把一个数组转化成其他格式

// 执行过程 求和函数 

// reduce方法使用的前提必须是 数组不能为空，如果只有一个值则返回当前值


// Array.prototype.reduce = function(callback,prev){
//     for(let i = 0; i < this.length;i++){
//         if(!prev){
//             prev = callback(this[i],this[i+1],i+1,this);
//             i++; // 下次 从3开始
//         }else{
//             prev = callback(prev,this[i],i,this)
//         }
//     }
//     return prev;
// }
// let r = ([1, 2, 3, 4, 5]).reduce(function(previousValue, currentValue, index, arrary) {
//     console.log(previousValue, currentValue)
//     return previousValue + currentValue
// },5);

// 实现数组flatten 

// console.log([1,[2,[3,[4]]]].flat(3))

// 返回值是上一次的 + 当前的值
// console.log(r)



// compose 面试问reduce 会让你实现compose  组合函数
function sum(a, b) {
    return a + b;
}

function len(str) {
    return str.length;
}

function addPrefix(str) {
    return '$' + str;
}
// let r = addPrefix(len(sum('a','b')));


// 之前
// const compose = (...fns) => (...args) => {
//     let lastFn = fns.pop();
//     return fns.reduceRight((prev, current) => current(prev), lastFn(...args))
// }


// a:addPrefix b:len
// a:function(...args) {return addPrefix(len(...args))}  b:sum
// function(...args) {
//     return (function(...args) {return addPrefix(len(...args))})(sum(...args))
// }

// function(...args) {
//     return  addPrefix(len(sum(...args)))
// }
const compose = (...fns) => fns.reduce((a, b) => (...args) => a(b(...args)))
let final = compose(addPrefix, len, sum); // 对第一次进行特殊处理
const r = final('a', 'b');
console.log(r);


// reduce 可以做收敛函数 最终转化成一个结果