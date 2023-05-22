import React, { memo } from 'react'
import { useUserToken } from "./hooks"

// User/Token

const Home = memo(() => {
  const [user, token] = useUserToken()

  return <h1>Home Page: {user.name}-{token}</h1>
})

const About = memo(() => {
  const [user, token] = useUserToken()

  return <h1>About Page: {user.name}-{token}</h1>
})

const App = memo(() => {
  return (
    <div>
      <h1>App Root Component</h1>
      <Home/>
      <About/>
    </div>
  )
})

export default App
