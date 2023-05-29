import React, { useEffect, useRef } from "react"
import { mount } from "dashboard/DashboardApp"

export default function DashboardApp() {
  const ref = useRef()
  useEffect(() => {
    mount(ref.current)
  }, [])
  return <div ref={ref}></div>
}
