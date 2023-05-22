import React, { PureComponent } from 'react'
import { withRouter } from '../hoc'

export class User extends PureComponent {
  render() {
    const { router } = this.props
    const { query } = router

    return (
      <div>
        <h1>User: {query.name}-{query.age}</h1>
      </div>
    )
  }
}

export default withRouter(User)