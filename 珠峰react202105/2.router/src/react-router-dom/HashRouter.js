import React from 'react';
import { Router } from '../react-router';
import { createHashHistory } from '../history';
class HashRouter extends React.Component {
    constructor(props) {
        super(props);
        this.history = createHashHistory(props)
    }
    render() {
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        )
    }
}
export default HashRouter;