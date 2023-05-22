import React, { PureComponent } from 'react'
import Home from './home/Home'
import Profile from './profile/Profile'

import appStyle from "./App.module.css"

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h2 className={appStyle.title}>我是标题</h2>
        <p className={appStyle.content}>我是内容, 哈哈哈哈</p>

        <Home/>
        <Profile/>
      </div>
    )
  }
}

export default App