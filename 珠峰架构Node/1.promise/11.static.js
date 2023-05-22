// Promise.resolve() 这个方法  会创造一个成功的promise

// let Promise = require('./source/3.promise')
// Promise.reject(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(200);
//     }, 1000);
// })).then((data) => {
//     console.log(data)
// }).catch(err => { // catch方法就是没有成功的失败
//     console.log(err, 'err')
// });

// Promise.all Promise.finally  




// 多个promise全部完成后获取结果，但是其中的某个如果失败了 那么这个promise就失败了

// 同步（同一时刻拿到） 多个异步请求的结果


Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let times = 0;
        const processSuccess = (index,val)=>{
            result[index] = val;
            if(++times === promises.length){
                resolve(result)
            }
        }
        for (let i = 0; i < promises.length; i++) { // 并发 多个请求一起执行的
            let p = promises[i]
            if(p && typeof p.then === 'function'){
                p.then((data)=>{
                    processSuccess(i,data)
                },reject); // 如果其中某一个promise失败了 直接执行失败即可
            }else{
                processSuccess(i,p)
            }
        }
    });
}
Promise.all([ 
    new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 2000);
}), new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('失败')
    }, 1000);
}),1, 2, 3]).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err,'errr')
})


// finally 如何实现一个promise.finally promise.race promise....
// generator + async + await  + eventLoop