import React, { Component } from 'react'
import MainBanner from './MainBanner'
import MainProductList from './MainProductList'

export class Main extends Component {
  render() {
    return (
      <div className='main'>
        <div>Main</div>
        <MainBanner/>
        <MainProductList/>
      </div>
    )
  }
}

export default Main