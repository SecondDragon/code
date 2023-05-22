import React, { PureComponent } from 'react'
import "./App.less"

export class App extends PureComponent {
  render() {
    return (
      <div className='app'>
        <div className='section'>
          <h2 className='title'>我是标题</h2>
          <p className='content'>我是内容, 哈哈哈</p>
        </div>
      </div>
    )
  }
}

export default App
