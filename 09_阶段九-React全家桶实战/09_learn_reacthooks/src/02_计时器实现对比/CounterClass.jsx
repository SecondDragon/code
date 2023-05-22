import React, { PureComponent } from 'react'

export class CounterClass extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>当前计数: {counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.decrement()}>-1</button>
      </div>
    )
  }
}

export default CounterClass