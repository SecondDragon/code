import React, { PureComponent } from 'react'

export class App extends PureComponent {

  constructor() {
    super()

    this.state = {
      username: ""
    }
  }

  handleSubmitClick(event) {
    // 1.阻止默认的行为
    event.preventDefault()

    // 2.获取到所有的表单数据, 对数据进行组件
    console.log("获取所有的输入内容")
    console.log(this.state.username)

    // 3.以网络请求的方式, 将数据传递给服务器(ajax/fetch/axios)
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  render() {
    const { username } = this.state

    return (
      <div>
        <form onSubmit={e => this.handleSubmitClick(e)}>
          {/* 1.用户名和密码 */}
          <label htmlFor="username">
            用户: 
            <input 
              id='username' 
              type="text" 
              name='username' 
              value={username} 
              onChange={e => this.handleUsernameChange(e)}
            />
          </label>

          <button type='submit'>注册</button>
        </form>
      </div>
    )
  }
}

export default App