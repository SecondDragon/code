import { createStore, compose, combineReducers } from "redux"
import { log, thunk, applyMiddleware } from "./middleware"
// import thunk from "redux-thunk"

import counterReducer from "./counter"
import homeReducer from "./home"
import userReducer from "./user"

// 正常情况下 store.dispatch(object)
// 想要派发函数 store.dispatch(function)

// 将两个reducer合并在一起
const reducer = combineReducers({
  counter: counterReducer,
  home: homeReducer,
  user: userReducer
})

// combineReducers实现原理(了解)
// function reducer(state = {}, action) {
//   // 返回一个对象, store的state
//   return {
//     counter: counterReducer(state.counter, action),
//     home: homeReducer(state.home, action),
//     user: userReducer(state.user, action)
//   }
// }

// redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;
const store = createStore(reducer)

applyMiddleware(store, log, thunk)

export default store
