// Promise.all 所有都成功才成功 有一个失败就失败了
// Promise.race 有一个成功或失败就采用他的结果  超时处理

// let p1 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve('成功')
//     }, 1000);
// })

// let p2 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         reject('失败')
//     }, 500);
// })
// 赛跑 采用最快的那一个  race 方法如果其中一个完成了 其他的还是会执行的，并没有采用他的结果

// Promise.race = function (promises) {
//     return new Promise((resolve,reject)=>{
//         for(let i = 0 ; i < promises.length;i++){
//             let p = promises[i];
//             if(p && typeof p.then === 'function'){
//                 p.then(resolve,reject); // 一旦成功就直接 停止
//             }else{
//                 resolve(p);
//             }
//         }
//     })
// }
// Promise.race([p1,p2,null,1]).then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err)
// });


// 图片加载 请求的加载  造成超时（不采用成功的结果了）
// var abort;
// let p1 = new Promise((resolve,reject)=>{
//     // abort = reject;
//     setTimeout(() => {
//         resolve('成功')
//     }, 3000);
// });
// p1.abort = abort;
// race 的特点是 其中一个失败了 就失败了 ，构造一个自己的promise和 p1 放在一起

// function wrap(p1){ // 图片加载失败问题 ， 脚本加载超时问题 
//     let abort;
//     let p = new Promise((resolve,reject)=>{ // 这是自己构造的promise，暴露一个终端方法
//         abort = reject;
//     });
//     let p2 =  Promise.race([p,p1])
//     p2.abort = abort; // 如果用户调用abort方法 这个p就失败了 = p2 就失败了
//     return p2;
// }
// let p2 = wrap(p1);
// p2.then((data)=>{
//     console.log(data)
// },(err)=>{
//     console.log(err)
// })
// setTimeout(() => {
//     // p2.abort('超过一秒了');
// }, 1000);

// axios = xhr.abort()  xhr.onerror xhr.timeout
// fetchApi 原生的 他没有中断方法


// ---------------------------------
// Promise.prototype.finally 无论如何都会执行，但是可以继续向下执行
// Promise.prototype.finally = function(cb){
//     return this.then((data)=>{
//         // 如何能保证promise执行完毕 
//         return Promise.resolve(cb()).then(()=>data);
//     },(err)=>{
//         // Promise.resolve 目的是等待cb()后的promise完成
//         return Promise.resolve(cb()).then(()=>{throw err});
//     })
// }
// let p1 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         reject('失败')
//     }, 3000);
// }).finally(()=>{ // = then  无论状态如何都会执行
//     console.log('finally')
//     return new Promise((resolve,reject)=>{ // 不会使用promise的成功结果
//        setTimeout(() => {
//         resolve(1000);
//        }, 1000);
//     })
// }).then((data)=>{   
//     console.log(data)
// }).catch(e=>{
//     console.log('catch',e)
// })

//实现： Promise.allSettled([p1,p2])   但是会获得所有的结果， 不会走catch方法
//      Promise.any([p1,p2])  如果其中一个成功了 就会走成功 取出的是第一个成功的值， 都失败了 才会走失败


// promisify 主要的功能是将一个异步的方法转化成promise的形式  主要是给node来使用的
// 回调函数的参数 永远第一个是error  error-first
const fs = require('fs');
function promisify(fn){
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,(err,data)=>{
                if(err) return reject(err);
                resolve(data);
            })
        })
    }
}
function promisifyAll(obj){
    let o = {};
    for(let key in obj ){
        if(typeof obj[key] === 'function'){
            o[key+'Promise'] = promisify(obj[key]);
        }
    }
    return o;
}
let newFs = promisifyAll(fs); // bluebird
newFs.readFilePromise('./.gitignore','utf8').then(data=>{
    console.log(data);
});
// fs.readFile('./.gitignore','utf8',function (err,data) {
//     console.log(data)
// })
