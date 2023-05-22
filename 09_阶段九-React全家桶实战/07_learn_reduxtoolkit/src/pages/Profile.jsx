import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { subNumber } from '../store/features/counter'

export class Profile extends PureComponent {

  subNumber(num) {
    this.props.subNumber(num)
  }

  render() {
    const { counter, banners, recommends } = this.props

    return (
      <div>
        <h2>Page Counter: {counter}</h2>
        <button onClick={e => this.subNumber(5)}>-5</button>
        <button onClick={e => this.subNumber(8)}>-8</button>

        <div className='banner'>
          <h2>轮播图展示</h2>
          <ul>
            {
              banners.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
        </div>
        <div className='recommend'>
          <h2>推荐的展示</h2>
          <ul>
            {
              recommends.map((item, index) => {
                return <li key={index}>{item.title}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  banners: state.home.banners,
  recommends: state.home.recommends
})

const mapDispatchToProps = (dispatch) => ({
  subNumber(num) {
    dispatch(subNumber(num))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)