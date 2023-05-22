# 05-异步编程 -1-Promise

## 一 异步编程与回调地狱

> 同步：对应内存中的顺序执行的指令
> 异步：当前进程外部的实体可以触发代码执行，类似于系统中断

异步行为虽然解决了高延迟资源访问时的等待问题，但是在实际开发中，会带来相当的不便。产生回调地狱的代码在可维护性上是相当差的：

```js
XHR.onreadystatechange = function(){
    if(){
        XHR2.onreadystatechange = function(){

            if(){

                XHR2.onreadystatechange = function(){

                    if(){
                        XHR2.onreadystatechange = function(){

                        }
                    }
                }
            }
        }
    }
}
```

异步的失败处理也同样不方便，因为要考虑成功回调、失败回调

```js
function double(value, success, failure) {
  setTimeout(() => {
    try {
      if (typeof value !== 'number') {
        throw 'Must provide number as first argument'
      }
      success(2 * value)
    } catch (e) {
      failure(e)
    }
  }, 1000)
}

const successCallback = (x) => console.log(`Success: ${x}`)
const failureCallback = (e) => console.log(`Failure: ${e}`)
double(3, successCallback, failureCallback) // Success: 6（大约 1000 毫秒之后）
double('b', successCallback, failureCallback) // Failure: Must provide number as first argument（大约 1000 毫秒之后）
```

异步的优化方案很多，包括将回调函数命名、全部采用函数名方式调用、优化代码结构、Node 中的第三方库 Async 等。但是这些在书写上都是治标不治本。

ECMAScript 提出了三个解决方案：

- Promise 方案：基本的异步解决方案
- generator 生成器方案：ES6 过渡方案
- async/await 方案：ES7 提出的方案，配合 Promise 能够完美解决 JS 异步问题

## 二 期约 Promise 基础

### 2.1 期约 Promise 基本概念

ES6 对市面流行的第三方 Promise/A+规范提供了完善支持，即 Promise 类型。Promise 是现在异步编程的核心机制，得到了所有现代浏览器的支持。

示例：

```js
// 构造函数必须传参，否则报错，一般该参数称为执行器 executor
// 传入的函数用来修改 Promise 的执行结果，正确与错误的结果分别位于 resolve、reject 中
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟 ajax
    let err = null
    let data = { uid: 1001 }
    if (err) {
      reject('发生了错误：', null)
    }
    resolve(data)
  })
})

// 实例方法 then：用于处理状态改变后的业务
p.then(
  (data) => {
    console.log(data)
  },
  (err) => {
    console.log(err)
  }
)

// 输出结果：
// { uid: 1001 }
```

从上看出，期约的作用其实是抽象的表示了一个异步操作。

### 2.2 then() 方法与 catch() 方法

then() 方法返回的仍然是一个 Promise 实例，所以可以使用 then 方法进行链式调用：

```js
let flag = false

// 在该函数内执行异步操作，并修改结果的状态值。
let p = new Promise(function (resolve, reject) {
  if (flag) {
    resolve('true...')
  } else {
    reject('false...')
  }
})

p.then((data) => {
  console.log('处理成功，结果为：', data)
}).catch((err) => {
  // 实例方法 catch：用于捕获错误
  console.log('处理失败，错误为：', err)
})
```

### 2.3 finally() 方法

```js
let p1 = Promise.resolve('foo')

let p2 = p1.finally()
let p3 = p1.finally(() => undefined)
let p4 = p1.finally(() => {})
let p5 = p1.finally(() => Promise.resolve())
let p6 = p1.finally(() => 'bar')
let p7 = p1.finally(() => Promise.resolve('bar'))
let p8 = p1.finally(() => Error('qux'))
setTimeout(console.log, 0, p2) // Promise <resolved>: foo
setTimeout(console.log, 0, p3) // Promise <resolved>: foo
setTimeout(console.log, 0, p4) // Promise <resolved>: foo
setTimeout(console.log, 0, p5) // Promise <resolved>: foo
setTimeout(console.log, 0, p6) // Promise <resolved>: foo
setTimeout(console.log, 0, p7) // Promise <resolved>: foo
setTimeout(console.log, 0, p8) // Promise <resolved>: foo
```

这个新期约实例不同于 then() 或 catch() 方式返回的实例。因为 onFinally 被设计为一个状态无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此。

## 三 期约 Promise 状态

### 3.1 Promise 的三种状态

每个 Promise 的生命周期都有两个阶段：`未决`，`已决`。在这两个阶段中，Promise 会出现三种状态：

- 未决（unsettled）：表示异步操作尚未结束，此时的 Promise 只有挂起态一种状态
- **待定**（pending）：也即挂起，可以转化为 兑现、拒绝两种状态中的一种。
- 已决（settled）：此时 Promise 已经执行结束，但是可能绵连执行成功、执行失败两种状态
- **兑现**（fulfilled）：Promise 的异步操作成功结束，调用 resolve() 将状态转换为兑现，对应完成处理函数 `fulfillment handler`
- **拒绝**（rejected）：Promise 的异步操作未成功结束，调用 reject() 将状态转换为拒绝，对应错误处理函数 `rejection handler`

注意：期约的状态是私有的，无法被 JS 检测到，也无法被修改。

### 3.2 Promise.resolve()

期约并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态，通过调用 Promise.resolve() 静态方法，可以实例化一个解决的期约：

```js
// 二者没有区别
let p1 = new Promise((resolve, reject) => resolve())
let p2 = Promise.resolve()
```

如果传入的参数本身是一个期约，那它的行为就类似于一个空包装。因此，Promise.resolve() 可以说是一个幂等方法，如下所示：

```js
let p = Promise.resolve(7)
setTimeout(console.log, 0, p === Promise.resolve(p)) // true

setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))) // true
```

这个静态方法能够包装任何非期约值，包括错误对象，并将其转换为解决的期约。因此，也可能导致不符合预期的行为：

```js
let p = Promise.resolve(new Error('foo'))
setTimeout(console.log, 0, p) // Promise <resolved>: Error: foo
```

### 3.3 Promise.reject()

Promise.reject() 会实例化一个拒绝的期约并抛出一个异步错误（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）。下面的两个期约实例实际上是一样的：

```js
let p1 = new Promise((resolve, reject) => reject())
let p2 = Promise.reject()
```

这个拒绝的期约的理由就是传给 Promise.reject() 的第一个参数。这个参数也会传给后续的拒绝处理程序：

```js
let p = Promise.reject(3)
setTimeout(console.log, 0, p) // Promise <rejected>: 3
p.then(null, (e) => setTimeout(console.log, 0, e)) // 3
```

注意：Promise.reject() 并没有照搬 Promise.resolve() 的幂等逻辑。如果给它传一个期约对象，则这个期约会成为它返回的拒绝期约的理由：

```js
// Promise <rejected>: Promise <resolved>
setTimeout(console.log, 0, Promise.reject(Promise.resolve()))
```

### 3.4 同步/异步执行的二元性

```js
try {
  throw new Error('foo')
} catch (e) {
  console.log(e) // Error: foo
}

// Uncaught (in promise) Error: bar
try {
  Promise.reject(new Error('bar'))
} catch (e) {
  console.log(e)
}
```

第一个 try/catch 抛出并捕获了错误，第二个 try/catch 抛出错误却没有捕获到，因为后者没有通过异步模式捕获错误。从这
里可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。

## 四 Promise 拒绝处理争议

Promise 的最大争议是：Promise 被拒绝时，若缺少拒绝处理函数，会静默失败：

```js
let p = Promise.reject(42)

// 此时 p 不会被处理

// 一段时间之后
p.catch((value) => {
  // 现在 p 才被处理
  console.log(value)
})
```

在未来的 ES 版本中才会解决该问题，Node 和浏览器目前已经做出了支持：若没有拒绝处理事件，会执行默认的错误处理函数。

- unhandledRejection：当一个 Promise 被拒绝，而在事件循环的一个轮次中没有任何拒绝处理函数被调用，该事件就会被触发；
- rejectionHandled：若一个 Promise 被拒绝，并在事件循环的一个轮次之后有了拒绝处理函数被调用，该事件就会被触发。

这两个事件旨在共同帮助识别已被拒绝但未曾被处理 promise。

## 五 Promise 其他 API

- `Promise.all`：参数数组中**所有**Promise 实例的状态为 resolved 或者 rejected 时，调用 then 方法
- 示例：`Promise.all([fn1, fn2])`
- `Promise.race`：参数数组中**任一**Promise 实例的状态修改，调用 then 方法
- 示例：`Promise.all([fn1, fn2])`
- 示例：`Promise.race([fn1, fn2])`

## 六 期约的取消、追踪

### 6.1 期约取消

ES6 的期约不支持取消，可以利用令牌机制取消：

```html
<button id="start">Start</button>
<button id="cancel">Cancel</button>
<script>
  class CancelToken {
    constructor(cancelFn) {
      this.promise = new Promise((resolve, reject) => {
        cancelFn(() => {
          setTimeout(console.log, 0, 'delay cancelled')
          resolve()
        })
      })
    }
  }
  const startButton = document.querySelector('#start')
  const cancelButton = document.querySelector('#cancel')
  function cancellableDelayedResolve(delay) {
    setTimeout(console.log, 0, 'set delay')
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        setTimeout(console.log, 0, 'delayed resolve')
        resolve()
      }, delay)
      const cancelToken = new CancelToken((cancelCallback) =>
        cancelButton.addEventListener('click', cancelCallback)
      )
      cancelToken.promise.then(() => clearTimeout(id))
    })
  }
  startButton.addEventListener('click', () => cancellableDelayedResolve(1000))
</script>
```

扩展实现期约的进度监控：

```js
class TrackablePromise extends Promise {
  constructor(executor) {
    const notifyHandlers = []
    super((resolve, reject) => {
      return executor(resolve, reject, (status) => {
        notifyHandlers.map((handler) => handler(status))
      })
    })
    this.notifyHandlers = notifyHandlers
  }
  notify(notifyHandler) {
    this.notifyHandlers.push(notifyHandler)
    return this
  }
}

let p = new TrackablePromise((resolve, reject, notify) => {
  function countdown(x) {
    if (x > 0) {
      notify(`${20 * x}% remaining`)
      setTimeout(() => countdown(x - 1), 1000)
    } else {
      resolve()
    }
  }
  countdown(5)
})
```
