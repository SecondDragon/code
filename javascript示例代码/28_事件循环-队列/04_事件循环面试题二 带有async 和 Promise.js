async function bar() {
  //foo 里调用了bar 直接执行  console.log("22222")
  console.log("22222");
  // return new Promise((resolve) => {
  //   resolve()
  // })

  // return Promise.resolve(
  //   new Promise((resolve) => {
  //     resolve();
  //   })
  // );

  // 2.返回thenable
  // return {
  //   then: function(resolve, reject) {
  //     resolve("hahahah")
  //   }
  // }
}

async function foo() {
  //async foo 函数里面的代码是直接按照顺序执行的，所以调用foo 会先打印 11111 不会打印 44444
  console.log("111111")

  //await 的 bar()也会立即执行，因为 它和上面的 console.log("111111")是 属于同一代码块的
  await bar()
  //因为 await bar() 返回一个promise (前面讲的特性，必然返回一个promise)
  //所以  console.log("33333") 相当于在一个promise.then 里面执行 可以看成 是 bar 里new出来的 then的后面
  //所以 console.log("33333") 加入到了 微任务队列
  console.log("33333")
}

foo()
new Promise((resolve) => {
  resolve();
})
  .then(() => {
    console.log("5555555");
  })
  .then(() => {
    console.log("6666666");
  })
  .then(() => {
    console.log("77777777");
  })
  .then(() => {
    console.log("888888888");
  });
console.log("444444")

// 111111
// 22222
// 4444444
// 33333



// async function async1 () {
//   console.log('async1 start')
//   await async2();
//   console.log('async1 end')
// }

// async function async2 () {
//   console.log('async2')
// }

// console.log('script start')

// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)

// async1();

// new Promise (function (resolve) {
//   console.log('promise1')
//   resolve();
// }).then (function () {
//   console.log('promise2')
// })

// console.log('script end')


// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout


















// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
