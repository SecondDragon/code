// 回调函数的方式  callback setTimeout / fs.readFile .... 回调地狱
// promise 只是优化了一下 并没有完全结果
// generator 可以把函数的执行权交出去 * / yield
// async + await 基于generator的  语法糖


// 我们知道核心靠的就是switch case 来实现的


// let  regeneratorRuntime = {
//     mark(genFn){
//         return genFn
//     },
//     wrap(iteratorFn){
//         const context = {
//             next:0,
//             done:false, // 表示迭代器没有完成
//             stop(){
//                 this.done = true
//             }
//         }
//         let it ={ };
//         it.next = function (v) { // 用户调用的next方法
//            context.sent = v
//            let value = iteratorFn(context);
//            return {
//                value,
//                done:context.done // 是否完成
//            }
//         }
//         return it;
//     }
// }
// "use strict";

// var _marked = /*#__PURE__*/regeneratorRuntime.mark(read);

// function read() {
//   var a, b, c;
//   return regeneratorRuntime.wrap(function read$(_context) {
//       switch (_context.prev = _context.next) {
//         case 0:
//           _context.next = 2;
//           return 1;

//         case 2:
//           a = _context.sent;
//           console.log('a',a);
//           _context.next = 6;
//           return 2;

//         case 6:
//           b = _context.sent;
//           console.log('b',b);
//           _context.next = 10;
//           return 3;

//         case 10:
//           c = _context.sent;
//           console.log('c',c);

//         case 12:
//         case "end":
//           return _context.stop();
//     }
//   }, _marked);
// }

// let it = read(); // 默认没有执行
// let {value,done} = it.next('abc'); // 第一次传递参数是没有意义的
// // 给next方法传递参数时 他的传参会给上一yield的返回值
// {
//     let {value,done} = it.next('abc')
//     console.log(value,done)
// }
// {
//     let {value,done} = it.next('ddd')
//     console.log(value,done)
// }
// {
//     let {value,done} = it.next('eee')
//     console.log(value,done)
// }




// function* read() { // 生成器 他执行的结果叫迭代器
//     var a = yield 1;
//     console.log(a);
//     var b = yield 2;
//     console.log(b);
//     var c = yield 3;
//     console.log(c);
// }
// let it = read();
// let value,done;
// do{
//     let {value:v,done:d} = it.next(value);
//     value = v;
//     done = d;
// }while(!done)
// 先读取 a.txt -> b.txt = b

const util = require('util');
const fs = require('fs')
let readFile = util.promisify(fs.readFile)


// TJ co
// const co = require('co');
function co(it) {
    return new Promise((resolve,reject)=>{
        // 异步的迭代  只能用递归的方法
        function next(data){
            let {value,done} = it.next(data);
            if(done){ // 如果执行完毕则 完成
                resolve(value);
            }else{
                // 原生的promise 有优化 如果是promise 内部会直接把promise返回
                Promise.resolve(value).then(next,reject)
            }
        }
        next();
    })
}
// function* read() {
//     let data = yield readFile('./a1.txt', 'utf8');
//     data = yield readFile(data, 'utf8');
//     return data;
// }
// co(read()).then(data=>{
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })


// let it = read(); // it => next
// let { value, done } = it.next();
// value.then(data => {
//     let { value, done } = it.next(data);
//     value.then(data=>{
//         let {value,done} =  it.next(data);
//         console.log(value,done)
//     })
// })

// generator + co 让代码看起来更像同步 但是需要co库  语法糖

async function read() {
    let data = await readFile('./a.txt', 'utf8');
    data = await readFile(data, 'utf8');
    let r = await 1000
    return r;
}

read().then(data=>{
    console.log(data);
})