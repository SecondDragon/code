// promise 还是基于回调的 es6-promise 
// 1.promise是一个类 ，无需考虑兼容性
// 2.当使用promise的时候 会传入一个执行器，此执行器是立即执行
// 3.当前executor 给了两个函数可以来描述当前promise的状态。promise中有三个状态 成功态  失败态 等待态
// 默认为等待态  如果调用resolve会走到成功态，如果调用reject 或者发生异常 会走失败态
// 4.每个promise实例都有一个then方法
// 5.promise 一旦状态变化后不能更改
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
    constructor(executor) {
        this.status = PENDING; // promise默认的状态
        this.value = undefined; // 成功的原因
        this.reason = undefined; // 失败的原因
        this.onResolvedCallbacks = []; // 存放成功的回调方法
        this.onRejectedCallbacks = []; // 存放失败的回调方法
        const resolve = (value) => { // 成功resolve函数
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED; // 修改状态
                // 发布
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        }
        const reject = (reason) => { // 失败的reject函数
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED // 修改状态

                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then( onFulfilled, onRejected){ // onFulfilled, onRejected
        // 订阅模式
        if(this.status == PENDING){ // 代码是异步调用resolve或者reject的
            this.onResolvedCallbacks.push(()=>{ // 切片编程 AOP
                // todo...
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(()=>{
                // todo...
                onRejected(this.reason);
            });
        }
        if(this.status == FULFILLED){ // 成功调用成功方法
            onFulfilled(this.value);
        }
        if(this.status === REJECTED){ // 失败调用失败方法
            onRejected(this.reason);
        }
    }
}

module.exports = Promise
