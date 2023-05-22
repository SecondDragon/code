// 1.定义App根组件
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message: "Hello World"
    }
  }

  render() {
    // 1.state的解构, 获取到message
    const { message } = this.state

    return (
      <div>
        { /* JSX的注释写法 */ }
        {/* 我是注释 */}
        <h2>{message}</h2>
      </div>
    )
  }
}