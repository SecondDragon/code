import React, { memo } from 'react'
import { connect } from "react-redux"
import { addNumberAction, subNumberAction } from './store/modules/counter'

const App = memo((props) => {
  const { count, addNumber, subNumber } = props

  function addNumberHandle(num, isAdd = true) {
    if (isAdd) {
      addNumber(num)
    } else {
      subNumber(num)
    }
  }

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={e => addNumberHandle(1)}>+1</button>
      <button onClick={e => addNumberHandle(6)}>+6</button>
      <button onClick={e => addNumberHandle(6, false)}>-6</button>
    </div>
  )
})

const mapStateToProps = (state) => ({
  count: state.counter.count
})

const mapDispatchToProps = (dispatch) => ({
  addNumber(num) {
    dispatch(addNumberAction(num))
  },
  subNumber(num) {
    dispatch(subNumberAction(num))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
