/**
 * React v16增加了对Portal的直接支持
 * 它可以把JSX渲染到一个单独的DOM节点中
 * */

import React from './react';
import ReactDOM from './react-dom';

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.node = document.createElement('div');

        // this.node =document.getElementsByClassName('Dialog')
        document.body.appendChild(this.node);
    }

    render() {
        return <div>
            {ReactDOM.createPortal(
                <div className="dialog">
                    {this.props.children}
                </div>,
                this.node
            )}
        </div>
    }

    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Dialog>模态窗</Dialog>

                {/*<p className="Dialog" style={{color:'red'}}></p>*/}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.getElementById('root'));