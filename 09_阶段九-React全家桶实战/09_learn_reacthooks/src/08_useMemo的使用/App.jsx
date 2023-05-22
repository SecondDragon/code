import React, { memo, useCallback } from 'react'
import { useMemo, useState } from 'react'


const HelloWorld = memo(function(props) {
  console.log("HelloWorld被渲染~")
  return <h2>Hello World</h2>
})


function calcNumTotal(num) {
  // console.log("calcNumTotal的计算过程被调用~")
  let total = 0
  for (let i = 1; i <= num; i++) {
    total += i
  }
  return total
}

const App = memo(() => {
  const [count, setCount] = useState(0)

  // const result = calcNumTotal(50)

  // 1.不依赖任何的值, 进行计算
  const result = useMemo(() => {
    return calcNumTotal(50)
  }, [])

  // 2.依赖count
  // const result = useMemo(() => {
  //   return calcNumTotal(count*2)
  // }, [count])

  // 3.useMemo和useCallback的对比
  function fn() {}
  // const increment = useCallback(fn, [])
  // const increment2 = useMemo(() => fn, [])


  // 4.使用useMemo对子组件渲染进行优化
  // const info = { name: "why", age: 18 }
  const info = useMemo(() => ({name: "why", age: 18}), [])

  return (
    <div>
      <h2>计算结果: {result}</h2>
      <h2>计数器: {count}</h2>
      <button onClick={e => setCount(count+1)}>+1</button>

      <HelloWorld result={result} info={info} />
    </div>
  )
})

export default App