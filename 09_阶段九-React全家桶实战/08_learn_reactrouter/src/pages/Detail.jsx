import React, { PureComponent } from 'react'
import { withRouter } from '../hoc'

export class Detail extends PureComponent {
  render() {
    const { router } = this.props
    const { params } = router

    return (
      <div>
        <h1>Detail Page</h1>
        <h2>id: {params.id}</h2>
      </div>
    )
  }
}

export default withRouter(Detail)