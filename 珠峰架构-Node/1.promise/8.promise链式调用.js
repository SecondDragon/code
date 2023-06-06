// promise的特点 解决了什么问题 1.链式调用解决嵌套回调的问题 和 2.同步并发问题 3. 多个异步处理错误问题
// 1.链式调用解决嵌套回调的问题
const fs = require('fs'); // 上一个人输出是下一个的输入 
let Promise = require('./source/3.promise')
function readFile(filePath,encoding){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,encoding,(err,data)=>{ // nodeApi 转化成promise
            if(err) return reject(err);
            resolve(data);
        })
    })
}

let promise2 = new Promise((resolve)=>{
    resolve(1);
}).then(data=>{
    return new Promise((resolve,reject)=>{ // x 可能是一个promise
        setTimeout(() => {
            resolve('ok')
        }, 1000);
    })
},(err)=>{
    return 111
})
promise2.then(data=>{
    console.log(data)
},err=>{
    console.log('error',err)
});

// 分析--------------------------------


// 1.promise的链式调用  当调用then方法后会返回一个新的promise
// 情况1： then中方法返回的是一个（普通值 不是promise）的情况, 会作为外层下一次then的成功结果
// 情况2： then中方法 执行出错 会走到外层下一次then的失败结果
// 清空3： 如果then中方法返回的是一个promise对象， 此时会根据promise的结果来处理是走成功还是失败 （传入的是成功或者失败的内容）
// 无论上一次then走是成功还是失败，只要返回的是普通值 都会执行下一次then的成功

// 总结： 如果返回一个普通值 （除了promise） 就会传递给下一个then的成功，如果返回一个失败的promise或者抛出异常，会走下一个then的失败
// readFile('./a.txt','utf8').then((value)=>{
//     return readFile(value+'1','utf8')
// },(err)=>{
//     return new Error();
// })  // promise实例已经是失败了,如果用的是同一个promise 那么失败了就不能成功
// .then((data)=>{
//     console.log('s',data)
// },()=>{
//     console.log('fail')
// })

// fs.readFile('./a.txt','utf8',function (err,data) {
//     if(err) return console.log(err)
//     fs.readFile('./b.txt','utf8',(err,data)=>{
//         if(err) return console.log(err)
//         console.log(data);
//     })
// })
