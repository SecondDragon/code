// 1  同一个promise只能改变一次状态
let p = new Promise(function(resolve, reject) {
    reject();
    resolve();
})
p.then(function() {
    console.log('成功')
}, function() {
    console.log('失败')
})

// 2
// try{
//     executor(resolve,reject)
// }catch(e){}
// let promise2 = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         let x = onFulfilled()
//         resolvePromise(promise2,x)
//     }, 0);
// })
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve() // resolve 和 reject 没有终止代码执行的功能
    console.log(2)
})
promise.then(() => {
    console.log(3)
});


// 3 
// typeof onFulfilled == 'fucntion'? onFulfilled :v=>v
Promise.resolve(1) // new Promise((resolve,reject)=>resolve(1))
    .then(res => 2)
    .catch(err => 3) // .then(null,err=>3)
    .then(res => console.log(res));


// 4 
Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => { throw new Error('My Error') })
    .catch(() => {throw 'xxx'}) // catch中返回普通值 会作为下一次的成功
    .then((x) => x + 1)
    .then((x) => console.log(x))
    .catch(console.error)

// 5 
async function async1() {
    console.log('async1 start'); //
    await async2(); // async2().then(()=>  console.log('async-next'))
    console.log('async-next')
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

// async 返回的是一个 promise ，await相当于yield + co  => 调用then方法，做了一次延迟

// script start
// async1 start
// async2
// promise1
// script end
// async-next
// promise2
// settimeout


// 6  js 规范
Promise.resolve().then(() => { // then1
        console.log('then1');
         Promise.resolve().then(() => { 
            console.log('then1-1');
            return Promise.resolve(); // 如果then中的方法返回了一个promise 会发生什么？  x.then().then()
        }).then(() => {
            console.log('then1-2')
        })
    })
    .then(() => { 
        console.log('then2');
    })
    .then(() => {
        console.log('then3');
    })
    .then(() => {
        console.log('then4');
    })
    .then(() => {
        console.log('then5');
    })
// 队列是一个 因为是微任务中创造的微任务
//微任务队列  1.[then1]  2.[then1-1,then2]  3.[x.then,then3]  4.[then4] 5. [then5]
// 按照promoise a+规范执行的结果 但是我们的浏览器规定了，如果return了一个promise ，会额外在开辟一个异步方法 （相当于又多了一次then）
// [x.then,then3,then1-2,then4,then5]
// then1 then1-1 then2 then3,then1-2,then4,then5
