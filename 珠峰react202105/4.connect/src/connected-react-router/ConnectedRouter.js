import React from 'react';
//import { ReactReduxContext } from 'react-redux';
import { Router } from 'react-router';
import { onLocationChange } from './actions'
import {connect} from 'react-redux';
class ConnectedRouter extends React.PureComponent {
  //static contextType = ReactReduxContext;
  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      //dispatch方法向仓库派发，这个跟history没关系
      this.props.dispatch(onLocationChange(location, action));
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    let { history, children } = this.props;
    return (
      <Router history={history}>
        {children}
      </Router>
    )
  }
}
export default connect()(ConnectedRouter);