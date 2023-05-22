import React, { Component } from 'react'
import ThemeContext from './context/theme-context'

export class Profile extends Component {
  render() {
    console.log(this.context)

    return (
      <div>Profile</div>
    )
  }
}

Profile.contextType = ThemeContext

export default Profile