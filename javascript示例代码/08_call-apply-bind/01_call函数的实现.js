// // apply/call/bind的用法
// // js模拟它们的实现? 难度
//
// // 给所有的函数添加一个hycall的方法
// Function.prototype.hycall = function(thisArg, ...args) {
//   //...args 剩余参数
//   // 在这里可以去执行调用的那个函数(foo)
//   // 问题: 得可以获取到是哪一个函数执行了hycall
//
//
//   // 1.获取需要被执行的函数 的函数对象
//
//   var fn = this
//
//   // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
//   thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window
//
//   // 3.调用需要被执行的函数
//   thisArg.fn = fn
//   var result = thisArg.fn(...args)
//   delete thisArg.fn
//
//   // 4.将最终的结果返回出去
//   return result
// }
//
//
// function foo() {
//   console.log("foo函数被执行", this)
// }
//
// function sum(num1, num2) {
//   console.log("sum函数被执行", this, num1, num2)
//   return num1 + num2
// }
//
//
// // 系统的函数的call方法
// foo.call(undefined)
// var result = sum.call({}, 20, 30)
// // console.log("系统调用的结果:", result)
//
// // 自己实现的函数的hycall方法
// // 默认进行隐式绑定
// // foo.hycall({name: "why"})
// foo.hycall(undefined)
// var result = sum.hycall("abc", 20, 30)
// console.log("hycall的调用:", result)
//
// // var num = {name: "why"}
// // console.log(Object(num))

// ...args剩余参数
Function.prototype.hycall = function (thisArg, ...args) {
  console.log("hycall被调用了");
  //  在这里要想办法执行调用了hycall函数的那个函数
  //   问题: 得可以获取到是哪一个函数执行了hycall
  console.log("打印当前的this", this);
  // 1.获取需要被执行的函数
  var fn = this;
  // 2.对thisArg转成对象类型(防止它传入的是非对象类型)
  //Object() 可以将字面量转成对应的包装类型
  //如果thisArg 本身就是一个对象，Object()不会改变他
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;
  // 3.调用需要被执行的函数
  thisArg.fn = fn;
  //展开运算符
  var result = thisArg.fn(...args);
  delete thisArg.fn;
  // 4.将最终的结果返回出去
  return result;
};

function foo() {
  console.log("foo函数被执行", this);
}

function sum(num1, num2) {
  console.log("sum函数被执行", this, num1, num2);
  return num1 + num2;
}
var obj = {
  a: 1,
  b: 2,
};

// 默认进行隐式绑定
var b = foo.hycall("111111111");
// 默认进行隐式绑定
var a = sum.hycall(obj, 9, 8);

console.log(a);

// call函数的实现

Function.prototype.stlCall = function (thisArg, ...args) {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  // 这里的this就是调用stlCall方法的函数-------也可以看成是它的函数对象
  var fn = this;

  thisArg.fn = fn;

  return thisArg.fn(...args);
};

// apply函数的实现
Function.prototype.stlApply = function (thisArg, args) {
  thisArg =
    thisArg !== null && thisArg !== undefined ? Object(thisArg) : window;

  // 这里的this就是调用stlCall方法的函数-------也可以看成是它的函数对象
  var fn = this;

  thisArg.fn = fn;
  argArray = argArray || [];

  return thisArg.fn(...args);
};
