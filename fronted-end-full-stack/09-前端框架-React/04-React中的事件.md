# 04-React 中的事件

## 一 React 组件绑定事件

React 仍然能够使用原生的 DOM 事件绑定方式，只是 React 推荐使用行内直接绑定的方式：

```js
class Title extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <h1 id="title" onClick={this.test}>
        hello
      </h1>
    )
  }

  // 原生方式：通过获取 id 为 title 的元素绑定事件，或者直接在标签内添加：onclick="test()"
  // react 推荐方式：行内 onClick={test}。注意这里只是一个赋值语句，如果写 test() 则赋值的是该函数返回值，且会被默认首先调用一次
  test = () => {
    console.log('hello world!')
    console.log(this) // 输出 Title 组件实例
  }
}
```

贴士：React 通过`onXX` 方式指定事件处理函数，但是并非是原生的 DOM 事件，是 React 通过事件委托方式处理的（委托给最外层元素）。通过 `event.target` 可以得到事件的 DOM 元素。

## 二 this 指向问题

### 2.0 指向问题描述

在上述示例中，test 是一个箭头函数，这里如果要直接写为普通函数则会出现下列问题：

```js
test(){
    console.log('hello world!')
    console.log(this) // undefined
}
```

在类 Title 中，构造器、render() 内部的 this 都是实例对象本身，但是在 test() 中却是 undefined 的！！这是因为前者都是通过实例调用的，而 test() 的调用者是 window！

如下示例：

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  info() {
    console.log(this)
  }
}

const p = new Person('Jack', 18)
p.info() // 正确输出 this 实例

const o = p.info
o() // undefined
```

`info()` 方法是放置在 Person 的原型上的，Person 实例并没有 `info()`方法，使用实例调用`p.info()`是顺着原型链找到了原型上的方法进行调用的。而 `const o = p.info` 赋值语句中，`p.info`并没有调用 `info()`方法，而是简单赋值，故而是 undefined。

同理，组件中的构造器方法、`render()` 方法是通过组件实例调用的，但是自定义方法默认并不是由组件实例调用，而是作为事件的回调在使用！！这就造成了自定义方法的 this 可能是全局的 window，但是组件中的方法也默认开启了局部的严格模式，所以下列示例函数`fn()`中的 this 默认是 undefined。

`onClick={this.test}` 这里的 test 没有调用，只是简单赋值，造成了绑定的事件函数其实是 undefined。

### 2.1 解决方案 - 箭头函数

由于箭头函数中的 this 是其定义的地方，所以可以使用箭头函数方式解决：

```js
class Comp extends React.Component {
  constructor(props) {
    super(props)
  }
  fn = () => {
    console.log(this)
  }
  render() {
    return (
      <div>
        组件
        <button onClick={this.fn}>点击</button>
      </div>
    )
  }
}
```

### 2.2 解决方案-bind

```js
class Comp extends React.Component {
  constructor(props) {
    super(props)
    this.fn = this.fn.bind(this) // 在实例上挂载一个新函数 fn
  }
  fn() {
    console.log(this)
  }
  render() {
    return (
      <div>
        组件
        <button onClick={this.fn}>点击</button>
      </div>
    )
  }
}
```

也可以在调用时直接 bind 绑定：

```js
class Comp extends React.Component {
  constructor(props) {
    super(props)
  }
  fn() {
    console.log(this)
  }
  render() {
    return (
      <div>
        组件
        <button onClick={this.fn.bind(this)}>点击</button>
      </div>
    )
  }
}
```
