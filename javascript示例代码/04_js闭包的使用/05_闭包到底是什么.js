var time = 20;
function foo() {
  // AO: 销毁
  var name = "foo";
  // time=18
  function bar() {
    console.log("bar", name, time);
  }

  return bar;
}

var fn = foo();
fn();

var name = "why";
function demo() {
  console.log(name);
}

// 可以访问: test就是闭包
// 有访问到: test就是不是闭包
function test() {
  var name = "ok";
  // 1
  demo();
  // 10000
}
function test2() {
  // test2算不算闭包呢，有点争论，从可以访问外层作用域的角度来说，它是闭包
}

test();
// 看看会打印什么
// 如果是  why 说明 闭包的变量绑定是在函数进行词法解析的时候就已经确定，因此，test函数里的AO的name不会影响打印 why
// 当然，如果不加 var 那么 name就会改变全局的name变量，当然会打印ok，这不违反闭包会在词法分析时就确定好其父级AO的说法

// 闭包（英语：Closure），又称词法闭包（Lexical Closure）或函数闭包（function closures）；
// 是在支持 头等函数 的编程语言中，实现词法绑定的一种技术；
