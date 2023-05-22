const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';


// 利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
    // 核心流程
    if (promise2 === x) {
        return reject(new TypeError('错误'))
    }
    // 我可能写的promise 要和别人的promise兼容，考虑不是自己写的promise情况
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') { // 有可能是promise 
        // 别人的promise可能调用成功后 还能调用失败~~~  确保了别人promise符合规范
        let called = false;
        try { // 有可能then方法是通过defineProperty来实现的 取值时可能会发生异常
            let then = x.then;
            if (typeof then === 'function') {
                // 这里我就认为你是promise了  x.then 这样写会触发getter可能会发生异常  
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 直到解析他不是promise位置
                }, r => { // reason
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else { // {}  {then:{}}
                resolve(x); // 常量
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x); // 说明返回的是一个普通值 直接将他放到promise2.resolve中
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; // promise默认的状态
        this.value = undefined; // 成功的原因
        this.reason = undefined; // 失败的原因
        this.onResolvedCallbacks = []; // 存放成功的回调方法
        this.onRejectedCallbacks = []; // 存放失败的回调方法
        const resolve = (value) => { // 成功resolve函数
            if(value instanceof Promise){
                return value.then(resolve,reject)
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED; // 修改状态
                // 发布
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => { // 失败的reject函数
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED // 修改状态
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    // then中的参数是可选的
    then(onFulfilled, onRejected) { // onFulfilled, onRejected
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; }
        // 用于实现链式调用
        let promise2 = new Promise((resolve, reject) => {
            // 订阅模式
            if (this.status == FULFILLED) { // 成功调用成功方法
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        // 此x 可能是一个promise， 如果是promise需要看一下这个promise是成功还是失败 .then ,如果成功则把成功的结果 调用promise2的resolve传递进去，如果失败则同理

                        // 总结 x的值 决定是调用promise2的 resolve还是reject，如果是promise则取他的状态，如果是普通值则直接调用resolve
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (this.status === REJECTED) { // 失败调用失败方法
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);

            }
            if (this.status == PENDING) { // 代码是异步调用resolve或者reject的
                this.onResolvedCallbacks.push(() => { // 切片编程 AOP
                    setTimeout(() => {
                        try {
                            // todo...
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            // todo...
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        })
        return promise2
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value);
        })
    }
    static reject(value){
        return new Promise((resolve,reject)=>{
            reject(value);
        })
    }
    catch(errorFn){
        return this.then(null,errorFn)
    }

    static all = function(promises) {
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
}
// npm install promises-aplus-tests -g


// 延迟对象 帮我们减少一次套用 ： 针对目前来说 应用不是很广泛
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve= resolve;
        dfd.reject = reject;
    }); 
    return dfd;
}
module.exports = Promise