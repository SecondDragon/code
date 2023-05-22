let Promise = require('./source/1.promise')
let promise = new Promise((resolve,reject)=>{
    console.log('promise')
    throw new Error('失败了')
    reject('reason')
    resolve('value')
})
promise.then((value)=>{ // then是异步的
    console.log('success',value)
},(reason)=>{
    console.log('err',reason)
})
