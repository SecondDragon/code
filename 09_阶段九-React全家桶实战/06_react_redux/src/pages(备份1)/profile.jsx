import React, { PureComponent } from 'react'
import store from "../store"
import { subNumberAction } from '../store/actionCreators'

export class Profile extends PureComponent {
  constructor() {
    super()

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState()
      this.setState({ counter: state.counter })
    })
  }

  subNumber(num) {
    store.dispatch(subNumberAction(num))
  }

  render() {
    const { counter } = this.state

    return (
      <div>
        <h2>Profile Counter: {counter}</h2>
        <div>
          <button onClick={e => this.subNumber(1)}>-1</button>
          <button onClick={e => this.subNumber(5)}>-5</button>
          <button onClick={e => this.subNumber(8)}>-8</button>
          <button onClick={e => this.subNumber(20)}>-20</button>
          <button onClick={e => this.subNumber(100)}>-100</button>
        </div>
      </div>
    )
  }
}

export default Profile