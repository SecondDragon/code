import React, { PureComponent } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { withRouter } from "../hoc"

export class Home extends PureComponent {
  navigateTo(path) {
    const { navigate } = this.props.router
    navigate(path)
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <div className='home-nav'>
          <Link to="/home/recommend">推荐</Link>
          <Link to="/home/ranking">排行榜</Link>
          <button onClick={e => this.navigateTo("/home/songmenu")}>歌单</button>
        </div>

        {/* 占位的组件 */}
        <Outlet/>
      </div>
    )
  }
}

export default withRouter(Home)