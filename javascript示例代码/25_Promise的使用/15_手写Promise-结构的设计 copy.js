// ES6 ES2015
// https://promisesaplus.com/
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// class STLPromise {
//   constructor(executor) {
//     this.status=PROMISE_STATUS_PENDING
//
//     this.value = undefined
//     this.reason = undefined
//
//
//     const resolve = () => {
//       if (this.status === PROMISE_STATUS_PENDING) {
//         this.status = PROMISE_STATUS_FULFILLED
//         console.log("resolve 被调用");
//       }
//
//     }
//     const reject = () => {
//        if (this.status === PROMISE_STATUS_PENDING) {
//          this.status = PROMISE_STATUS_REJECTED;
//         console.log("reject 被调用");
//        }
//
//     };
//     console.log("执行期函数：",executor);
//     executor(resolve, reject);
//   }
// }

class MyPromise{
    constructor(executor) {
        debugger
        this.status = PROMISE_STATUS_PENDING

        this.value=''
        this.reason=''
        const resolve=(value)=>{
            if (this.status===PROMISE_STATUS_PENDING){
                this.status=PROMISE_STATUS_FULFILLED
                console.log("resolve")
                this.value=value
                queueMicrotask(()=>{
                    this.onFulfilled(this.value)
                })

            }
        }
        const reject =(reason)=>{
            if (this.status===PROMISE_STATUS_PENDING){
                this.status=PROMISE_STATUS_REJECTED
                console.log("reject")
                this.reason=reason
                queueMicrotask(()=>{
                    this.onRejected(this.reason)
                })

            }
        }
        executor(resolve,reject)
    }

    then(onFulfilled, onRejected) {
        debugger
        this.onFulfilled = onFulfilled
        this.onRejected = onRejected
    }


}




var executor = (resolve1, reject) => {
   console.log("promise2是否会直接调用");
  resolve1()
}

// const promise = new STLPromise((resolve, reject) => {
//   console.log("是否会直接调用");

//   resolve()

// });

const promise = new MyPromise(executor);


promise.then(res => {
    console.log("2dfsdfsdfsdfsdfsdfsd")
}, err => {

})

// window.onclick = function() {

// }

