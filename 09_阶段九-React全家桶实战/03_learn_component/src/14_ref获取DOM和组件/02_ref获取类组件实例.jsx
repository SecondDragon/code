import React, { PureComponent, createRef } from 'react'


class HelloWorld extends PureComponent {
  test() {
    console.log("test------")
  }

  render() {
    return <h1>Hello World</h1>
  }
}

export class App extends PureComponent {
  constructor() {
    super()

    this.hwRef = createRef()
  }

  getComponent() {
    console.log(this.hwRef.current)
    this.hwRef.current.test()
  }

  render() {
    return (
      <div>
        <HelloWorld ref={this.hwRef}/>
        <button onClick={e => this.getComponent()}>获取组件实例</button>
      </div>
    )
  }
}

export default App