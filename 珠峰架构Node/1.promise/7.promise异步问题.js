let Promise = require('./source/2.promise')
let promise = new Promise((resolve,reject)=>{ // pending
  setTimeout(() => {
      resolve('ok')
  }, 1000);
})

// 当用户调用then方法的时候 此时promise可能为等待态， 先暂存起来，因为后续可能会调用resolve和reject， 等会再触发对应onFulfilled 或者 onRejected
promise.then((value)=>{ // then是异步的
    console.log('success1',value)
},(reason)=>{
    console.log('err',reason)
})
promise.then((value)=>{ // then是异步的
    console.log('success2',value)
},(reason)=>{
    console.log('err',reason)
})
