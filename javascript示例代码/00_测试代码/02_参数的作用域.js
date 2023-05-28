var x = 0

// 当函数的参数有默认值时, 会多形成一个新的作用域  所以y = function() { x = 3; console.log(x) } 执行时 修改的3 实际修改的是形参y= x  , 这个作用域用于保存参数的值

// function foo(x, y = function () { x = 3; console.log(x) }) {
function foo(x, y = function () { x = 3; console.log(x) }) {

  console.log(x)
  var x = 2
  y()
  console.log(x)
}
foo()
console.log(x)
















// undefined
// 3
// 2
// 0

//  上面的打印的是 

// undefined
// 3
// 2
// 0

// 原因是  foo 执行的时候 没有传入参数 所以 第一个 x 打印的是 参数里的x赋值   ,这里的x 是参数作用域里的x
// 打印 undefined
// 随后执行 var x = 2 这里定义 并 改变的是 函数作用域 里得x 
// 随后执行 y() ,由于 参数 有自己的作用域 所以 x=3 改变的是 参数作用域里的x

// 打印 3

//  随后执行 console.log(x) ，打印的是 函数作用域的x 打印2


// 修改后 更能体现出 拥有默认值的参数 会拥有 参数作用域 

function foo2(x, y = function () { x = 3; console.log(x); }) {
  console.log(x);
  y();
  console.log(x);

  var x;
  console.log(x);
}
foo2(1);
console.log(x);

// 1;
// 3;
// 1;
// 1;
// 0;

// 注意 有  var x ;时  函数作用域里是有 x的 ,参数所做的只是赋值 函数内部执行的代码是能够在本级作用域 里找到
// x的

// 如果  函数里没有对 x的定义 那么，所有的x就都是从上城作用域里拿的了

// 如果删除 var x;

// 1
// 3
// 3
// 3
// 0







var x=5

function foo3(x, y = x + 2) {
  console.log(x);
  // y();
  console.log(y);
  console.log(x);

  var x;
  console.log(x);
}
foo3(1);
console.log(x);