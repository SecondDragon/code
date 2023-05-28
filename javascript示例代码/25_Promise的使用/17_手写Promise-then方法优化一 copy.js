// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledFns = []
    this.onRejectedFns=[]


    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // this.status = PROMISE_STATUS_FULFILLED在这个位置的话，就会先执行改状态，再执行then 再执行queueMicrotask里的东西，配合then,就会出现直接执行的效果，
        // 因此需要将其放入queueMicrotask中，但是
        // this.status = PROMISE_STATUS_FULFILLED;
        //
        queueMicrotask(() => {
          // if (this.status !== PROMISE_STATUS_PENDING) return;  这行代码的意思是，虽然都可以加入微任务，但是如果，之前的微任务已经把状态改了，那么之后的微任务就不再执行
          // 解决了 this.status = PROMISE_STATUS_FULFILLED; 放进微任务之后  reject和 resolve 都可以 加入微任务 的 问题
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          console.log(this.value, "---------");

          this.onFulfilledFns.forEach((fn) => fn(this.value));
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // this.status = PROMISE_STATUS_REJECTED
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason
          this.onRejectedFns.forEach(fn=>fn(this.reason))
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    // 如果在我们调用的时候，状态已经确定了
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value)
     }
    //
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason)
    }
    if (this.status === PROMISE_STATUS_PENDING) {
    this.onFulfilledFns.push(onFulfilled);
    this.onRejectedFns.push(onRejected)
    }

  }
}

const promise = new HYPromise((resolve, reject) => {
  console.log("状态pending")
  // reject(2222)
  resolve(1111)
})

// 调用then方法
// 调用then方法多次调用
promise.then(res => {
  console.log("res1:", res)
}, err => {
  console.log("err:", err)
})

promise.then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})


setTimeout(() => {
  promise.then(
    (res) => {
      console.log("res3:", res);
    },
    (err) => {
      console.log("err2:", err);
    }
  );
},3000)




























// }).then(res => {
//   console.log("res3:", res)
// })

// const PROMISE_STATUS_PENDING = 'pending'
// const PROMISE_STATUS_FULFILLED = 'fulfilled'
// const PROMISE_STATUS_REJECTED = 'rejected'


// class STLPromise{


//   constructor(executor) {
//     this.status = PROMISE_STATUS_PENDING;
//     this.value = undefined;
//     this.reason = undefined

//     const resolve = (value) => {
//       if (this.status === PROMISE_STATUS_PENDING) {
//         this.status = PROMISE_STATUS_FULFILLED;
//         console.log("执行resolve");
//       }
//     };
//     const reject = (reason) => {
//       if (this.status === PROMISE_STATUS_PENDING) {
//         this.status = PROMISE_STATUS_REJECTED;
//         console.log("执行reject");
//       }
//     };
//     executor(resolve,reject);
//   }
//   then(onFulfilled, onRejected) {

//   }
// }

// const promise = new STLPromise((resolve,reject) => {
//   resolve()
// })

// promise.then(res => {
//   console.log("res2:", res)
// }, err => {
//   console.log("err2:", err)
// })

