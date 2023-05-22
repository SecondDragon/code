import React, { PureComponent } from 'react'
import { HomeWrapper, HYButtonWrapper } from './style'

export class Home extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <div className='top'>
          <div className='banner'>BannerContent</div>
        </div>
        <div className='bottom'>
          <h2 className='header'>商品列表</h2>
          <ul className='product-list'>
            <li className='item'>商品列表1</li>
            <li className='item'>商品列表2</li>
            <li className='item'>商品列表3</li>
          </ul>
        </div>

        <HYButtonWrapper>哈哈哈</HYButtonWrapper>
      </HomeWrapper>
    )
  }
}

export default Home