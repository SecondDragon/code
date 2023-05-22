import React from "react";


// 1.类组件
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      message: "App Component"
    }
  }

  render() {
    // const { message } = this.state
    // 1.react元素: 通过jsx编写的代码就会被编译成React.createElement, 所以返回的就是一个React元素
    // return <h2>{message}</h2>

    // 2.组件或者fragments(后续学习)
    // return ["abc", "cba", "nba"]
    // return [
    //   <h1>h1元素</h1>,
    //   <h2>h2元素</h2>,
    //   <div>哈哈哈</div>
    // ]

    // 3.字符串/数字类型
    // return "Hello World"

    return true
  }
}

export default App;
