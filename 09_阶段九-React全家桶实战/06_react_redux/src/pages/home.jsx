import React, { PureComponent } from 'react'
import store from "../store"
import { addNumberAction } from '../store/counter'

export class Home extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter.counter,

      message: "Hello World",
      friends: [
        {id: 111, name: "why"},
        {id: 112, name: "kobe"},
        {id: 113, name: "james"},
      ]
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState().counter
      this.setState({ counter: state.counter })
    })
  }

  addNumber(num) {
    store.dispatch(addNumberAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <div>
          <button onClick={e => this.addNumber(1)}>+1</button>
          <button onClick={e => this.addNumber(5)}>+5</button>
          <button onClick={e => this.addNumber(8)}>+8</button>
        </div>
      </div>
    )
  }
}

export default Home