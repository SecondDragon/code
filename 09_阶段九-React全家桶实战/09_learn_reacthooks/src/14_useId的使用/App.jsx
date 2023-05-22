import React, { memo, useId, useState } from 'react'

const App = memo(() => {
  const [count, setCount] = useState(0)

  const id = useId()
  console.log(id)

  return (
    <div>
      <button onClick={e => setCount(count+1)}>count+1:{count}</button>

      <label htmlFor={id}>
        用户名:<input id={id} type="text" />
      </label>
    </div>
  )
})

export default App
