import React, { memo } from 'react'
import CounterClass from './CounterClass'
import CounterHook from './CounterHook'

const App = memo(() => {
  return (
    <div>
      <h1>App Component</h1>
      <CounterClass/>
      <CounterHook/>
    </div>
  )
})

export default App
