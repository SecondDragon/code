// 回顾函数
function foo() {
  console.log("foo function")
}

foo()

// 高阶函数
function foo2(fn) {
  console.log("foo function")
  setTimeout(() => {
    fn()
  }, 2000)
}

foo2(function() {

})

// [].map().filter.reduce().forEach().map()

// 高阶函数
function foo3() {
  function bar() {

  }
  return bar
}

const fn = foo3()

