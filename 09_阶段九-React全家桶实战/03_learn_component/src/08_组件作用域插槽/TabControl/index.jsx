import React, { Component } from 'react'
import "./style.css"

export class TabControl extends Component {
  constructor() {
    super()

    this.state = {
      currentIndex: 0
    }
  }

  itemClick(index) {
    // 1.自己保存最新的index
    this.setState({ currentIndex: index })

    // 2.让父组件执行对应的函数
    this.props.tabClick(index)
  }

  render() {
    const { titles, itemType } = this.props
    const { currentIndex } = this.state

    return (
      <div className='tab-control'>
        {
          titles.map((item, index) => {
            return (
              <div 
                className={`item ${index === currentIndex?'active':''}`} 
                key={item}
                onClick={e => this.itemClick(index)}
              >
                {/* <span className='text'>{item}</span> */}
                {itemType(item)}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default TabControl