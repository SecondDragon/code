// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class STLPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;

    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        //执行then传进来的回调函数
        //  this.value = value;
        //  this.onFulfilled(this.value);
        // queueMicrotask是一个微任务，眼是一种延时调用
        queueMicrotask(() => {
          this.value = value;
          this.onFulfilled(this.value);
        });

        // setTimeout(() => {
        //   this.value = value;
        //     this.onFulfilled(this.value);
        // },0)

        console.log("resolve 被调用");
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        //执行或者传进来的回调函数
        // this.onRejected();
        console.log("reject 被调用");
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }
}

// const promise = new STLPromise((resolve, reject) => {
//   console.log("是否会直接调用");

//   resolve()
 
// });
const promise = new STLPromise((resolve, reject) => {
  console.log("状态pending");
  // reject(2222)
  resolve(1111);
});

// 调用then方法
promise.then(
    (res) => {
      console.log("res1:", res);
      return 1111;
    },
    (err) => {
      console.log("err:", err);
    }
  )
  // .then((res) => {
  //   console.log("res3:", res);
  // });

// 调用then方法
promise.then(res => {
  console.log("res2:", res)
}, err => {
  console.log("err2:", err)
})





// promise.then(res => {

// }, err => {

// })

// window.onclick = function() {
  
// }

