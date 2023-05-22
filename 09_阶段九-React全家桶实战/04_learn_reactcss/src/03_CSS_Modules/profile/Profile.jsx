import React, { PureComponent } from 'react'
// import "./Profle.css"
import profileStyle from "./Profle.module.css"

export class Profile extends PureComponent {
  render() {
    return (
      <div>
        <div className={profileStyle.section}>
          Profile Section
        </div>
      </div>
    )
  }
}

export default Profile