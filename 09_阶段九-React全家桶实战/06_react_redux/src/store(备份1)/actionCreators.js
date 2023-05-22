import * as actionTypes from "./constants"
import axios from "axios"

export const addNumberAction = (num) => ({
  type: actionTypes.ADD_NUMBER,
  num
})

export const subNumberAction = (num) => ({
  type: actionTypes.SUB_NUMBER,
  num
})


export const changeBannersAction = (banners) => ({
  type: actionTypes.CHANGE_BANNERS,
  banners
})

export const changeRecommendsAction = (recommends) => ({
  type: actionTypes.CHANGE_RECOMMENDS,
  recommends
})



export const fetchHomeMultidataAction = () => {
  // 如果是一个普通的action, 那么我们这里需要返回action对象
  // 问题: 对象中是不能直接拿到从服务器请求的异步数据的
  // return {}

  return function(dispatch, getState) {
    // 异步操作: 网络请求
    // console.log("foo function execution-----", getState().counter)
    axios.get("http://123.207.32.32:8000/home/multidata").then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      // dispatch({ type: actionTypes.CHANGE_BANNERS, banners })
      // dispatch({ type: actionTypes.CHANGE_RECOMMENDS, recommends })
      dispatch(changeBannersAction(banners))
      dispatch(changeRecommendsAction(recommends))
    })
  }

  // 如果返回的是一个函数, 那么redux是不支持的
  // return foo
}

