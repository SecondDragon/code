import React, { PureComponent } from 'react'
// import axios from "axios"
import { connect } from "react-redux"
import { addNumber } from '../store/features/counter'
import { fetchHomeMultidataAction } from '../store/features/home'

// import store from "../store"
// import { changeBanners, changeRecommends } from '../store/features/home'

export class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeMultidata()

  //   axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
  //     const banners = res.data.data.banner.list
  //     const recommends = res.data.data.recommend.list

  //     store.dispatch(changeBanners(banners))
  //     store.dispatch(changeRecommends(recommends))
  //   })
  }

  addNumber(num) {
    this.props.addNumber(num)
  }

  render() {
    const { counter } = this.props

    return (
      <div>
        <h2>Home Counter: {counter}</h2>
        <button onClick={e => this.addNumber(5)}>+5</button>
        <button onClick={e => this.addNumber(8)}>+8</button>
        <button onClick={e => this.addNumber(18)}>+18</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter
})

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumber(num))
  },
  fetchHomeMultidata() {
    dispatch(fetchHomeMultidataAction({name: "why", age: 18}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
