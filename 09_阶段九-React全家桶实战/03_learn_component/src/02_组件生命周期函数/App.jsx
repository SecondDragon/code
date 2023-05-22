import React from "react"
import HelloWorld from "./HelloWorld"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isShowHW: true
    }
  }

  switchHWShow() {
    this.setState({ isShowHW: !this.state.isShowHW })
  }

  render() {
    const { isShowHW } = this.state

    return (
      <div>
        哈哈哈
        <button onClick={e => this.switchHWShow()}>切换</button>
        { isShowHW && <HelloWorld/> }
      </div>
    )
  }
}

export default App
