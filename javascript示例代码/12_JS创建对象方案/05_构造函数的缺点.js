function foo() {
  function bar() {

  }
  return bar
}

var fn1 = foo()
var fn2 = foo()

console.log(fn1 === fn2) //不相等

// 构造函数的缺点就在于每次创造对象都要运行构造函数
// 如果如果构造函数里面有函数表达式，那么每次创建对象都需要为对象内的函数创建函数对象
// 这样就浪费了内存

