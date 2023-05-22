import React, { PureComponent } from 'react'

export class Home extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      friends: []
    }
  }

  // shouldComponentUpdate(newProps, nextState) {
  //   // 自己对比state是否发生改变: this.state和nextState
  //   if (this.props.message !== newProps.message) {
  //     return true
  //   }
  //   return false
  // }

  render() {
    console.log("Home render")
    return (
      <div>
        <h2>Home Page: {this.props.message}</h2>
      </div>
    )
  }
}

export default Home