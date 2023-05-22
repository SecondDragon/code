import React, { PureComponent, createRef } from 'react'

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {

    }

    this.titleRef = createRef()
    this.titleEl = null
  }

  getNativeDOM() {
    // 1.方式一: 在React元素上绑定一个ref字符串
    // console.log(this.refs.why)

    // 2.方式二: 提前创建好ref对象, createRef(), 将创建出来的对象绑定到元素
    // console.log(this.titleRef.current)

    // 3.方式三: 传入一个回调函数, 在对应的元素被渲染之后, 回调函数被执行, 并且将元素传入
    console.log(this.titleEl)
  }

  render() {
    return (
      <div>
        <h2 ref="why">Hello World</h2>
        <h2 ref={this.titleRef}>你好啊,李银河</h2>
        <h2 ref={el => this.titleEl = el}>你好啊, 师姐</h2>
        <button onClick={e => this.getNativeDOM()}>获取DOM</button>
      </div>
    )
  }
}

export default App