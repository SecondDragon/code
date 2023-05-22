import React, { memo, useState } from 'react'

const App = memo(() => {
  const [message, setMessage] = useState("Hello World")
  // const [count, setCount] = useState(100)
  // const [banners, setBanners] = useState([])

  function changeMessage() {
    setMessage("你好啊, 李银河!")
  }

  return (
    <div>
      <h2>App: {message}</h2>
      <button onClick={changeMessage}>修改文本</button>
    </div>
  )
})

export default App