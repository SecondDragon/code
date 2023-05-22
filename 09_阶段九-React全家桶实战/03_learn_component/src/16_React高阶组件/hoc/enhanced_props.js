import { PureComponent } from 'react'

// 定义组件: 给一些需要特殊数据的组件, 注入props
function enhancedUserInfo(OriginComponent) {
  class NewComponent extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        userInfo: {
          name: "coderwhy",
          level: 99
        }
      }
    }

    render() {
      return <OriginComponent {...this.props} {...this.state.userInfo}/>
    }
  }

  return NewComponent
}

export default enhancedUserInfo
