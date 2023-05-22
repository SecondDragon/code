import React, { memo, useState, useDeferredValue } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const deferedShowNames = useDeferredValue(showNames)

  function valueChangeHandle(event) {
    const keyword = event.target.value
    const filterShowNames = namesArray.filter(item => item.includes(keyword))
    setShowNames(filterShowNames)
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: </h2>
      <ul>
        {
          deferedShowNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App
