import { useEffect } from "react"
import { useState } from "react"

function useLocalStorage(key) {
  // 1.从localStorage中获取数据, 并且数据数据创建组件的state
  const [data, setData] = useState(() => {
    const item = localStorage.getItem(key)
    if (!item) return ""
    return JSON.parse(item)
  })

  // 2.监听data改变, 一旦发生改变就存储data最新值
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data])

  // 3.将data/setData的操作返回给组件, 让组件可以使用和修改值
  return [data, setData]
}


export default useLocalStorage
