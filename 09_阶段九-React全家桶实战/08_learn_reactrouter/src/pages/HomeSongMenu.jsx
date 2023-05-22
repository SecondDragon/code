import React, { PureComponent } from 'react'
import { withRouter } from "../hoc"

export class HomeSongMenu extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      songMenus: [
        { id: 111, name: "华语流行" },
        { id: 112, name: "古典音乐" },
        { id: 113, name: "民谣歌曲" },
      ]
    }
  }

  NavigateToDetail(id) {
    const { navigate } = this.props.router
    navigate("/detail/" + id)
  }

  render() {
    const { songMenus } = this.state

    return (
      <div>
        <h1>Home Song Menu</h1>
        <ul>
          {
            songMenus.map(item => {
              return <li key={item.id} onClick={e => this.NavigateToDetail(item.id)}>{item.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default withRouter(HomeSongMenu)
