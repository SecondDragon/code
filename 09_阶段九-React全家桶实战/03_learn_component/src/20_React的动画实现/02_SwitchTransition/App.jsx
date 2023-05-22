import React, { PureComponent } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import "./style.css"

export class App extends PureComponent {
  constructor() {
    super() 

    this.state = {
      isLogin: true
    }
  }

  render() {
    const { isLogin } = this.state

    return (
      <div>
        <SwitchTransition mode='out-in'>
          <CSSTransition
            key={isLogin ? "exit": "login"}
            classNames="login"
            timeout={1000}
          >
            <button onClick={e => this.setState({ isLogin: !isLogin })}>
              { isLogin ? "退出": "登录" }
            </button>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }
}

export default App