import React, { memo, useEffect } from 'react'
import { useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  // 负责告知react, 在执行完当前组件渲染之后要执行的副作用代码
  useEffect(() => {
    // 1.修改document的title(1行)
    console.log("修改title")
  })

  // 一个函数式组件中, 可以存在多个useEffect
  useEffect(() => {
    // 2.对redux中数据变化监听(10行)
    console.log("监听redux中的数据")
    return () => {
      // 取消redux中数据的监听
    }
  })

  useEffect(() => {
    // 3.监听eventBus中的why事件(15行)
    console.log("监听eventBus的why事件")
    return () => {
      // 取消eventBus中的why事件监听
    }
  })

  return (
    <div>
      <button onClick={e => setCount(count+1)}>+1({count})</button>
    </div>
  )
})

export default App