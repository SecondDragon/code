function createFnArray() {
  // var arr = [1, 1, 1, 1, 1, 1, 1, 1,1, 1,1, 1,1 ]
  // 占据的空间是4M x 100 + 其他的内存 = 400M+
  // 1 -> number -> 8byte -> 8M
  // js: 10 3.14 -> number -> 8byte ? js引擎
  // 8byte => 2的64次方 => 4byte
  // 小的数字类型, 在v8中成为Sim, 小数字 2的32次方
  var arr = new Array(1024 * 1024).fill(1);
  return function () {
    console.log(arr.length);
  };
}

var arrayFn = createFnArray();
// arrayFn()
// arrayFn = null

// 100 * 100 = 10000 = 10s
var arrayFns = [];
for (var i = 0; i < 100; i++) {
  setTimeout(() => {
    arrayFns.push(createFnArray());
  }, i * 100);
}

// arrayFns = null

setTimeout(()=>{
  for (var i = 0; i < 50; i++) {
  setTimeout(() => {
    console.log("定时器的执行");
    arrayFns.pop();
  }, i * 100);
}
},11000)

setTimeout(() => {
  for (var i = 0; i < 50; i++) {
    setTimeout(() => {
      console.log("定时器的执行");
      arrayFns.pop();
    }, i * 100);
  }
}, 26000);


// setTimeout(() => {
//   console.log("定时器的执行")
//   arrayFns = null;
// }, 5000);

// setTimeout(() => {
//   for (var i = 0; i < 50; i++) {
//     setTimeout(() => {
//       arrayFns.pop()
//     }, 100 * i);
//   }
// }, 10000);
