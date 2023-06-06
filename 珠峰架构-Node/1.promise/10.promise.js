const Promise = require('./source/3.promise');
const fs = require('fs')
// 递归解析promise
// let promise2 = new Promise((resolve)=>{
//     resolve(1);
// }).then(data=>{
//     return new Promise((resolve,reject)=>{ // x 可能是一个promise
//         setTimeout(() => {
//             resolve(new Promise((resolve,reject)=>{
//                 setTimeout(() => {
//                     resolve('200');
//                 }, 1000);
//             }))
//         }, 1000);
//     })
// },(err)=>{
//     return 111
// })
// promise2.then(data=>{
//     console.log(data)
// },err=>{
//     console.log('error',err)
// });


// 值的穿透 .then().then().then()
// new Promise((resolve, reject) => {
//     reject(200)
// }).then(null).then((data) => {
//     console.log(data, 's')
// }, err => {
//     console.log(err, 'e')
// })

// promise延迟对象的使用
// function readFile(filePath, encoding) {
//     let dfd = Promise.deferred();
//     fs.readFile(filePath, encoding, (err, data) => { // nodeApi 转化成promise
//         if (err) return dfd.reject(err);
//         dfd.resolve(data);
//     })
//     return dfd.promise;
// }

// readFile('./a.txt', 'utf8').then((data => {
//     console.log(data)
// }))


// 一个promise直接resolve一个promise的情况

// new Promise((resolve, reject) => {
//     reject(new Promise((resolve, reject) => {
//        setTimeout(() => {
//         resolve(100)
//        }, 1000);
//     }))
// }).then(data=>{
//     console.log(data);
// },err=>{
//     console.log(err,'err');
// })