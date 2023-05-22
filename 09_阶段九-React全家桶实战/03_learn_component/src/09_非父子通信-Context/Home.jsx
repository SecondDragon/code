import React, { Component } from 'react'
import HomeBanner from './HomeBanner'
import HomeInfo from './HomeInfo'

export class Home extends Component {
  render() {
    const { name, age } = this.props

    return (
      <div>
        <h2>Home: {name}-{age}</h2>
        <HomeInfo/>
        <HomeBanner/>
      </div>
    )
  }
}

export default Home