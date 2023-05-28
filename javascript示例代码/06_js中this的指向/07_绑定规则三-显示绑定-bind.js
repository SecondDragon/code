function foo() {
  console.log(this)
}

// foo.call("aaa")
// foo.call("aaa")
// foo.call("aaa")
// foo.call("aaa")

// 默认绑定和显示绑定bind冲突: 优先级(显示绑定)

var newFoo = foo.bind("aaa")
// bind会在堆内存里生成一个新的函数对象，不会影响之前的函数，
// 之后的newFoo调用都是用的新的函数，自然是this指向“aaa”的函数

newFoo()
newFoo()
newFoo()
newFoo()
newFoo()
newFoo()

var bar = foo
console.log(bar === foo)
console.log(newFoo === foo)
