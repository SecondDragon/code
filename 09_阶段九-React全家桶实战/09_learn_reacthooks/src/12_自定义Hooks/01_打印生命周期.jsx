import React, { memo, useEffect, useState } from 'react'

function useLogLife(cName) {
  useEffect(() => {
    console.log(cName + "组件被创建")
    return () => {
      console.log(cName + "组件被销毁")
    }
  }, [cName])
}

const Home = memo(() => {
  useLogLife("home")

  return <h1>Home Page</h1>
})

const About = memo(() => {
  useLogLife("about")

  return <h1>About Page</h1>
})

const App = memo(() => {
  const [isShow, setIsShow] = useState(true)

  useLogLife("app")

  return (
    <div>
      <h1>App Root Component</h1>
      <button onClick={e => setIsShow(!isShow)}>切换</button>
      { isShow && <Home/> }
      { isShow && <About/> }
    </div>
  )
})

export default App
