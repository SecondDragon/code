import React, { memo, useState, useTransition } from 'react'
import namesArray from './namesArray'

const App = memo(() => {
  const [showNames, setShowNames] = useState(namesArray)
  const [ pending, startTransition ] = useTransition()

  function valueChangeHandle(event) {
    startTransition(() => {
      const keyword = event.target.value
      const filterShowNames = namesArray.filter(item => item.includes(keyword))
      setShowNames(filterShowNames)
    })
  }

  return (
    <div>
      <input type="text" onInput={valueChangeHandle}/>
      <h2>用户名列表: {pending && <span>data loading</span>} </h2>
      <ul>
        {
          showNames.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
})

export default App
