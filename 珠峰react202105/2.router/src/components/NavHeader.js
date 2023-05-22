import React from 'react';
import {withRouter} from '../react-router-dom';
class NavHeader extends React.Component{
    render(){
        return <div onClick={()=>this.props.history.push('/')}>{this.props.title}</div>
    }
}

export default withRouter(NavHeader);