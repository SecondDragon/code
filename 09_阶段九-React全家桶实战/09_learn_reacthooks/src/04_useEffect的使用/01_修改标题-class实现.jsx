import React, { PureComponent } from 'react'

export class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: 100
    }
  }

  componentDidMount() {
    document.title = this.state.counter
  }

  componentDidUpdate() {
    console.log('-------')
    document.title = this.state.counter;
  }

  componentWillUnmount() {
    
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>计数: {counter}</h2>
        <button onClick={e => this.setState({ counter: counter+1 })}>+1</button>
      </div>
    )
  }
}

export default App
