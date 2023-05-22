import React, { Component } from 'react'
import axios from "axios"

import MainBanner from './MainBanner'
import MainProductList from './MainProductList'

export class Main extends Component {
  constructor() {
    super()

    this.state = {
      banners: [],
      productList: []
    }
  }

  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommend = res.data.data.recommend.list
      this.setState({
        banners,
        productList: recommend
      })
    })
  }

  render() {
    const { banners, productList } = this.state

    return (
      <div className='main'>
        <div>Main</div>
        <MainBanner banners={banners} title="轮播图"/>
        <MainBanner/>
        <MainProductList productList={productList}/>
      </div>
    )
  }
}

export default Main