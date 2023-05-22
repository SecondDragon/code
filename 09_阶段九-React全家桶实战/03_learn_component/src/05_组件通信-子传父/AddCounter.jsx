import React, { Component } from 'react'
// import PropTypes from "prop-types"

export class AddCounter extends Component {
  addCount(count) {
    this.props.addClick(count)
  }

  render() {

    return (
      <div>
        <button onClick={e => this.addCount(1)}>+1</button>
        <button onClick={e => this.addCount(5)}>+5</button>
        <button onClick={e => this.addCount(10)}>+10</button>
      </div>
    )
  }
}

// AddCounter.propTypes = {
//   addClick: PropTypes.func
// }

export default AddCounter