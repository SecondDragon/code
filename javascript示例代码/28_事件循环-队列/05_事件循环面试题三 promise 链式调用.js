// 第一种情况下 直接 return 4

// Promise.resolve().then(() => {
//   console.log(0);
//   // 1.直接return一个值 相当于resolve(4)
//   return 4
// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })





// 1.return 4
// 0
// 1
// 4
// 2
// 3
// 5
// 6


// 第二种情况下 return thenable的值

// Promise.resolve().then(() => {
//   console.log(0);
//   // 2.return thenable的值
// //  情况二：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据
// //  then方法的结果来决定Promise的状态：
//   return {
//     then: function(resolve) {
//       // 大量的计算
//       resolve(4);
//     }
//   }

// }).then((res) => {
//   console.log(res)
// })

// Promise.resolve().then(() => {
//   console.log(1);
// }).then(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// }).then(() => {
//   console.log(5);
// }).then(() =>{
//   console.log(6);
// })




// 2.return thenable
// 0
// 1
// 2
// 4
// 3
// 5
// 6

// 第三种情况下 3.return Promise
Promise.resolve()
  .then(() => {
    console.log(0);
    // 1.直接return一个值 相当于resolve(4)
    // return 4

    // 2.return thenable的值 为什么 要 后推 一次 微任务 呢 ，因为 函数 执行 或者 promise 执行 内部可能是 大量耗时运算 如果 直接拿到JS 线程里执行  的话
    // 那么 就有可能导致 后面的 微任务 无法执行 当然 这样 还是会阻塞后面的后面的 但是 一般不会存在这种特殊情况
    // return {
    //   then: function (resolve) {
    //     // 大量的计算
    //     resolve(4);
    //   },
    // };
    // 3.return Promise
    //  return 的 不是普通的值, 多加一次微任务
    // Promise.resolve(4), 多加一次微任务
    // 一共多加两次微任务
    return Promise.resolve().then(() => {console.log("async2 end1" );
    });
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 3.return promise
// 0
// 1
// 2
// 3
// 4
// 5
// 6

// console.log("// 面试题 4 答案");



// 面试题 4 
// async function async1 () {
//   // console.log('async1 start')
//   await async2();
//   console.log('async1 end')
// }

// async function async2 () {
//   console.log("async2 end");
//   // return {
//   //   then: function(resolve) {
//   //     // 大量的计算
//   //     console.log("async2 end1");
//   //     resolve(4);
//   //   }
//   // }
//   return Promise.resolve().then(() => { console.log("async2 end1");})
// }
// async1();

// new Promise(function (resolve) {
//   console.log("promise");
//   resolve();
// })
//   .then(function () {
//     console.log("promise1");
//   })
//   .then(function () {
//     console.log("promise2");
//   })
//   .then(function () {
//     console.log("promise3");
//   })
//   .then(function () {
//     console.log("promise4");
//   });

