/*
 如何创建一个Generator生成器函数？
   + 把创建函数的“function”后面加一个“*”即可
   + 箭头函数是无法变为生成器函数的

 每一个生成器函数，都是GeneratorFunction这个类的实例
   fn.__proto__ -> GeneratorFunction.prototype -> Function.prototype
   多了这样的一个私有属性 [[IsGenerator]]:true
 普通函数的原型链
   fn.__proto__ -> Function.prototype

 当生成器函数执行：
   + 首先并不会立即把函数体中的代码执行
   + 而是返回一个具备迭代器规范的对象「itor」
     itor.__proto__
     + next
     + throw
     + return
     + Symbol(Symbol.iterator) : function...
     + ...
   + 当进行itor.next()执行的时候
     + 把函数体中的代码开始执行
     + 返回一个对象
       + done:记录代码是否执行完毕
       + value:记录本次处理的结果
 */
/*
const fn = function* fn() {
    console.log("代码运行中:", 10);
    return 100;
};
let itor = fn();
console.log(itor.next()); //-> {done:true,value:100}
console.log(itor.next()); //-> {done:true,value:undefined}
*/

/*
// 对于ES6快捷赋值的语法，我们在方法名前面设置*，就可以创建生成器函数了
let obj = {
    // sum:function(){}
    *sum() {

    }
};
console.log(obj.sum());
*/

//=====================
/*
 Generator生成器函数的作用：
   可以基于返回的itor（迭代器对象），基于其next方法，控制函数体中的代码，一步步的去执行！！
   + 每一次执行next，控制函数体中的代码开始执行「或者从上一次暂停的位置继续执行」，遇到yield则暂停！！
     done:false
     value:yield后面的值
   + 当遇到函数体中的return，或者已经执行到函数最末尾的位置了
     done:true
     value:函数的返回值或者undefined
 */
/* const fn = function* fn() {
    console.log('A');
    yield 100;
    console.log('B');
    yield 200;
    console.log('C');
    yield 300;
    console.log('D');
    return 400;
};
let itor = fn();
console.log(itor.next()); //->{done:false,value:100}
console.log(itor.next()); //->{done:false,value:200}
console.log(itor.next()); //->{done:false,value:300}
console.log(itor.next()); //->{done:true,value:400} */

/* const fn = function* fn() {
    console.log('A');
    yield 100;
    console.log('B');
    yield 200;
    console.log('C');
    yield 300;
    console.log('D');
    return 400;
};
let itor = fn();
console.log(itor.next()); //->{done:false, value:100}
console.log(itor.return('哈哈哈')); //->{value:'哈哈哈', done:true} 相当于在函数体中执行遇到了return，结束整个函数的继续执行「done:true」，传递的值相当于return的值！！
console.log(itor.next()); //->{value:undefined, done:true}

/!*
console.log(itor.throw('哈哈哈')); //手动抛出异常「控制台报红」；生成器函数中的代码，都不会再执行了！！
console.log(itor.next()); //抛出异常后，它下面的代码也不会执行了
console.log('我是的外边的');
*!/
*/

//=====================
/* 
 params：生成器函数接收的实参值，它是生成器函数执行时传递的值
   fn(10,20,30)
   params:[10,20,30]

 itor.next(N)：每一次执行next方法，传递的值会作为上一个yield的返回值「所以第一次执行next方法，传递的值是没有用的，因为在它之前没有yield」
 */
/* 
const fn = function* fn(...params) {
    let x = yield 100;
    console.log(x); //'second:222'
    let y = yield 200;
    console.log(y); //'three:333'
};
let itor = fn(10, 20, 30);
console.log(itor.next('first:111')); //-> {value: 100, done: false}
console.log(itor.next('second:222')); //-> {value: 200, done: false}
console.log(itor.next('three:333')); //-> {value: undefined, done: true} 
*/

//=====================
/* const sum = function* sum() {
    yield 300;
    yield 400;
};
const fn = function* fn() {
    yield 100;
    yield* sum(); // yield*：支持让我们进入另外一个生成器函数中去一步步的执行 
    yield 200;
};
let itor = fn();
console.log(itor.next()); //-> {value: 100, done: false}
console.log(itor.next()); //-> {value: 300, done: false}
console.log(itor.next()); //-> {value: 400, done: false}
console.log(itor.next()); //-> {value: 200, done: false}
console.log(itor.next()); //-> {value: undefined, done: true} */

//=====================
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`@@${interval}`);
        }, interval);
    });
};

// 需求：串行请求，有三个请求「请求需要的时间分别是 1000/2000/3000」?
/* delay(1000)
    .then(value => {
        console.log('第一个请求成功：', value);
        return delay(2000);
    })
    .then(value => {
        console.log('第二个请求成功：', value);
        return delay(3000);
    })
    .then(value => {
        console.log('第三个请求成功：', value);
    })
    .catch(reason => {
        console.log('任何请求失败，都执行这里：', reason);
    }); */

/* (async () => {
    try {
        let value = await delay(1000);
        console.log('第一个请求成功：', value);

        value = await delay(2000);
        console.log('第二个请求成功：', value);

        value = await delay(3000);
        console.log('第三个请求成功：', value);
    } catch (reason) {
        console.log('任何请求失败，都执行这里：', reason);
    }
})(); */

// 基于Generator函数，模拟Await的语法，实现请求的串行
const handle = function* handle() {
    let value = yield delay(1000);
    console.log('第一个请求成功：', value);

    value = yield delay(2000);
    console.log('第二个请求成功：', value);

    value = yield delay(3000);
    console.log('第三个请求成功：', value);
};

/* 
编写通知Generator中代码逐一执行的方法 
ES8(ECMAScript2017)中，提供了async/await语法：用来简化promise的操作
   它是 Promise + Generator 的语法糖
   我们自己上边实现的AsyncFunction和Generator函数就是async/await的原理!!
*/
const AsyncFunction = function AsyncFunction(generator, ...params) {
    let itor = generator(...params);
    // 基于递归的方法，通知Generator函数中的代码逐一执行
    const next = x => {
        let { done, value } = itor.next(x);
        if (done) return;
        if (!(value instanceof Promise)) value = Promise.resolve(value);
        value.then(next);
    };
    next();
};
// AsyncFunction(handle);
AsyncFunction(function* (x, y) {
    let total = x + y;
    let value = yield total;
    console.log('@1-->', value);

    yield delay(2000);
    console.log('@2-->', '哈哈哈');
}, 10, 20);

/* (async (x, y) => {
    let total = x + y;
    let value = await total;
    console.log('@1-->', value);

    await delay(2000);
    console.log('@2-->', '哈哈哈');
})(10, 20); */