import React, { PureComponent } from 'react'
import { connect } from "react-redux"
import { changeBannersAction, changeRecommendsAction } from "../store/actionCreators"
import axios from "axios"

export class Category extends PureComponent {

  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      this.props.changeBanners(banners)
      this.props.changeRecommends(recommends)
    })
  }

  render() {
    return (
      <div>
        <h2>Category Page: {this.props.counter}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  changeBanners(banners) {
    dispatch(changeBannersAction(banners))
  },
  changeRecommends(recommends) {
    dispatch(changeRecommendsAction(recommends))
  }
})

export default connect(mapStateToProps, mapDispatchToProps )(Category)