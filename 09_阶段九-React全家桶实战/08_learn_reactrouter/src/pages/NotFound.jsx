import React, { PureComponent } from 'react'

export class NotFound extends PureComponent {
  render() {
    return (
      <div>
        <h1>Not Found Page</h1>
        <p>您进入的路径不存在, 请检测之后再操作或者联系开发人员:coderwhy</p>
      </div>
    )
  }
}

export default NotFound