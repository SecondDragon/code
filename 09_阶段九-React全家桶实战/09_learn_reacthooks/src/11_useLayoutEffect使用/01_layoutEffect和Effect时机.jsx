import React, { memo, useEffect, useLayoutEffect, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)
  
  useLayoutEffect(() => {
    console.log("useLayoutEffect")
  })

  useEffect(() => {
    console.log("useEffect")
  })

  console.log("App render")

  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={e => setCount(count + 1)}>+1</button>
    </div>
  )
})

export default App
