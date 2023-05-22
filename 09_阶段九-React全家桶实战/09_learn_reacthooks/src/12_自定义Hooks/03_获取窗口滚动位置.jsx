import React, { memo } from 'react'
import useScrollPosition from './hooks/useScrollPosition'
import "./style.css"

const Home = memo(() => {
  const [scrollX, scrollY] = useScrollPosition()

  return <h1>Home Page: {scrollX}-{scrollY}</h1>
})

const About = memo(() => {
  const [scrollX, scrollY] = useScrollPosition()

  return <h1>About Page: {scrollX}-{scrollY}</h1>
})

const App = memo(() => {
  return (
    <div className='app'>
      <h1>App Root Component</h1>
      <Home/>
      <About/>
    </div>
  )
})

export default App
