import React, { PureComponent } from 'react'

export class App extends PureComponent {

  constructor() {
    super()

    this.state = {
      username: "",
      password: "",
      isAgree: false,
      hobbies: [
        { value: "sing", text: "唱", isChecked: false },
        { value: "dance", text: "跳", isChecked: false },
        { value: "rap", text: "rap", isChecked: false }
      ],
      fruit: "orange"
    }
  }

  handleSubmitClick(event) {
    // 1.阻止默认的行为
    event.preventDefault()

    // 2.获取到所有的表单数据, 对数据进行组件
    console.log("获取所有的输入内容")
    console.log(this.state.username, this.state.password)
    const hobbies = this.state.hobbies.filter(item => item.isChecked).map(item => item.value)
    console.log("获取爱好: ", hobbies)

    // 3.以网络请求的方式, 将数据传递给服务器(ajax/fetch/axios)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAgreeChange(event) {
    this.setState({ isAgree: event.target.checked })
  }

  handleHobbiesChange(event, index) {
    const hobbies = [...this.state.hobbies]
    hobbies[index].isChecked = event.target.checked
    this.setState({ hobbies })
  }

  render() {
    const { username, password, isAgree, hobbies, fruit } = this.state

    return (
      <div>
        <form onSubmit={e => this.handleSubmitClick(e)}>
          {/* 1.用户名和密码 */}
          <div>
            <label htmlFor="username">
              用户: 
              <input 
                id='username' 
                type="text" 
                name='username' 
                value={username} 
                onChange={e => this.handleInputChange(e)}
              />
            </label>
            <label htmlFor="password">
              密码: 
              <input 
                id='password' 
                type="password" 
                name='password' 
                value={password} 
                onChange={e => this.handleInputChange(e)}
              />
            </label>
          </div>

          {/* 2.checkbox单选 */}
          <label htmlFor="agree">
            <input 
              id='agree' 
              type="checkbox" 
              checked={isAgree} 
              onChange={e => this.handleAgreeChange(e)}
            />
            同意协议
          </label>

          {/* 3.checkbox多选 */}
          <div>
            您的爱好:
            {
              hobbies.map((item, index) => {
                return (
                  <label htmlFor={item.value} key={item.value}>
                    <input 
                      type="checkbox"
                      id={item.value} 
                      checked={item.isChecked}
                      onChange={e => this.handleHobbiesChange(e, index)}
                    />
                    <span>{item.text}</span>
                  </label>
                )
              })
            }
          </div>

          {/* 4.select */}
          <select>
            <option value="apple">苹果</option>
            <option value="orange">橘子</option>
            <option value="banana">香蕉</option>
          </select>

          <div>
            <button type='submit'>注册</button>
          </div>
        </form>
      </div>
    )
  }
}

export default App