/* 自己创建一个Iterator类，来实现ES6中的迭代器规范 */
/* class Iterator {
    constructor(assemble) {
        // assemble:需要迭代的数据结构
        this.assemble = assemble;
        // index:记录迭代的次数(或者索引)
        this.index = -1;
    }
    // 必须具备next方法
    next() {
        let { assemble, index } = this;
        if (index >= assemble.length) {
            // 迭代完毕
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: assemble[index]
        };
    }
} */

/* 
创建一个实例对象，其应该具备迭代器规范的要求 
  itor.next() 具备next方法，执行这个方法可以依次获取到数据结构中的每一个成员值
  每一次获取的成员值是一个对象 
    + done:是否迭代完毕
    + value:当前获取的那个值
  符合以上两个特点的对象，我们称之为符合迭代器规范的对象！！
*/
/* let itor = new Iterator([10, 20, 30, 40]);
console.log(itor.next()); // {done:false,value:10}
console.log(itor.next()); // {done:false,value:20}
console.log(itor.next()); // {done:false,value:30}
console.log(itor.next()); // {done:false,value:40}
console.log(itor.next()); // {done:true,value:undefined} */

//============================
/*
 在JS中，有很多数据结构，天生具备迭代器规范，例如：
   我们主要看数据结构(对象)是否具备 Symbol.iterator 这个属性；有这个属性就具备迭代器规范，没有就不具备；具备这个规范，就可以使用 for/of 循环来迭代数据中的每一项值了！！
   + 数组  Array.prototype[Symbol(Symbol.iterator)]=function...
   + 部分类数组
     + arguments[Symbol(Symbol.iterator)]
     + NodeList.prototype[Symbol(Symbol.iterator)]
     + HTMLCollection.prototype[Symbol(Symbol.iterator)]
     + ...
   + 字符串 String.prototype[Symbol(Symbol.iterator)]
   + Set/Map
   + ...

 但是对于纯粹对象「或者自己构建的类数组对象」等来讲，默认是不具备 Symbol.iterator 这个属性的，所以他们不具备迭代器规范！「不能直接使用 for/of 循环」
 */

/* // 数组迭代的方式：for、while、forEach/map、for/in、for/of...
let arr = [10, 20, 30, 40];

arr[Symbol.iterator] = function () {
    console.log('FOR/OF START');
    let self = this, //this->arr
        index = -1;
    // 返回具备迭代器规范的对象 -> itor
    return {
        next() {
            index += 2;
            if (index >= self.length) {
                return {
                    done: true,
                    value: undefined
                };
            }
            return {
                done: false,
                value: self[index]
            };
        }
    };
};

for (let val of arr) {
    console.log(val);
} */

/* 
// for/of循环主要用于获取数据结构中每一项的“值”
for (let val of arr) {
    console.log(val);
} 
原理：
  1.迭代执行，先执行数组的Symbol.iterator这个方法，获取一个具备迭代器规范的对象->itor
  2.开始迭代：每一次迭代都是把 itor.next 方法执行
    + 把获取对象中的value属性值，赋值给val这个变量
    + 再看对象中done这个属性的值，如果是false，则继续迭代；如果是true，则结束迭代！！
*/

//============================
// 迭代对象的方式：for/in；获取所有的keys，然后迭代keys；也可以使用for/of(但是需要自己为其设置Symbol.iterator)
/* let obj = {
    name: 'zhufeng',
    age: 13,
    0: 100,
    [Symbol('AA')]: 200
};

Object.prototype[Symbol.iterator] = function iterator() {
    let self = this, //迭代的对象
        index = -1,
        keys = Reflect.ownKeys(self);
    return {
        next() {
            index++;
            if (index >= keys.length) {
                // 这个必须要设置，否则就是死循环了
                return {
                    done: true,
                    value: undefined
                };
            }
            let key = keys[index];
            return {
                done: false,
                value: self[key]
            };
        }
    };
};

for (let val of obj) {
    console.log(val);
} */

/* for (let val of obj) {
    console.log(val); //Uncaught TypeError: obj is not iterable
} */


/* // 如果是类数组，是可以直接借用数组原型上的Symbol.iterator方法的！！
let obj = {
    0: 10,
    1: 20,
    2: 30,
    length: 3
};
obj[Symbol.iterator] = Array.prototype[Symbol.iterator];
for (let val of obj) {
    console.log(val);
} */

/* 
if ( typeof Symbol === "function" ) {
    jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
*/

//=================================
// 数组迭代的方式：for、while、forEach/map、for/in、for/of...

let arr = new Array(9999999).fill(null);

console.time('FOR');
for (let i = 0; i < arr.length; i++) {
    // ...
}
console.timeEnd('FOR');

console.time('WHILE');
let i = 0;
while (i < arr.length) {
    // ...
    i++;
}
console.timeEnd('WHILE');

console.time('FOR-EACH');
arr.forEach(item => {
    // ...
});
console.timeEnd('FOR-EACH');

console.time('FOR-OF');
for (let val of arr) {
    // ...
}
console.timeEnd('FOR-OF');

console.time('FOR-IN');
for (let key in arr) {
    // ...
}
console.timeEnd('FOR-IN');