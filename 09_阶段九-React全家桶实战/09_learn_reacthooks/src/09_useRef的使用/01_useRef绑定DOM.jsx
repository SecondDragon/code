import React, { memo, useRef } from 'react'

const App = memo(() => {
  const titleRef = useRef()
  const inputRef = useRef()
  
  function showTitleDom() {
    console.log(titleRef.current)
    inputRef.current.focus()
  }

  return (
    <div>
      <h2 ref={titleRef}>Hello World</h2>
      <input type="text" ref={inputRef} />
      <button onClick={showTitleDom}>查看title的dom</button>
    </div>
  )
})

export default App