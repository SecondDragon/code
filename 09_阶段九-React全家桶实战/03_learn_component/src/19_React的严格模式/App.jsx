import React, { PureComponent, StrictMode } from 'react'
// import { findDOMNode } from "react-dom"
import Home from './pages/Home'
import Profile from './pages/Profile'

export class App extends PureComponent {
  render() {
    return (
      <div>
        <StrictMode>
          <Home/>
        </StrictMode>
        <Profile/>
      </div>
    )
  }
}

export default App