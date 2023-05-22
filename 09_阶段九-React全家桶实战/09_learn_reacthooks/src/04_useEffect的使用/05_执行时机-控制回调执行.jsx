import React, { memo, useEffect } from 'react'
import { useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("Hello World")

  useEffect(() => {
    console.log("修改title:", count)
  }, [count])

  useEffect(() => {
    console.log("监听redux中的数据")
    return () => {}
  }, [])

  useEffect(() => {
    console.log("监听eventBus的why事件")
    return () => {}
  }, [])

  useEffect(() => {
    console.log("发送网络请求, 从服务器获取数据")

    return () => {
      console.log("会在组件被卸载时, 才会执行一次")
    }
  }, [])

  return (
    <div>
      <button onClick={e => setCount(count+1)}>+1({count})</button>
      <button onClick={e => setMessage("你好啊")}>修改message({message})</button>
    </div>
  )
})

export default App