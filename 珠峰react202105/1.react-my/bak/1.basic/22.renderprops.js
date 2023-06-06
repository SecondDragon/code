import React from './react';
import ReactDOM from "./react-dom";

/*----------------------------------------------原生实现*/
// class MouseTracker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { x: 0, y: 0 };
//     }
//
//     handleMouseMove = (event) => {
//         this.setState({
//             x: event.clientX,
//             y: event.clientY
//         });
//     }
//
//     render() {
//         return (
//             <div onMouseMove={this.handleMouseMove}>
//                 <h1>移动鼠标!</h1>
//                 <p>当前的鼠标位置是 ({this.state.x}, {this.state.y})</p>
//             </div>
//         );
//     }
// }
// ReactDOM.render(<MouseTracker />, document.getElementById('root'));
/*----------------------------------------------原生实现*/


/*children   是一个渲染的方法-------------------------------------------------------*/


// class MouseTracker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {x: 0, y: 0}
//     }
//
//     handleMouseMove=(event)=>{
//         this.setState({x:event.clientX,y:event.clientY})
//     }
//     render() {
//         return (
//             <div onMouseMove={this.handleMouseMove}>
//                 {this.props.children(this.state)}
//             </div>
//         )
//     }
// }
// //这其实就是一个作用域插槽
// ReactDOM.render(<MouseTracker>
//     {
//         (props) => (
//             <div>
//                 <h1>移动鼠标!</h1>
//                 <p>当前的鼠标位置是 ({props.x}, {props.y})</p>
//             </div>
//         )
//     }
// </MouseTracker>, document.getElementById('root'))

/*children   是一个渲染的方法-------------------------------------------------------*/

/*render属性-------------------------------------------------------------------*/
// class MouseTracker extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {x: 0, y: 0}
//     }
//
//     handleMouseMove = (event) => {
//         this.setState({x: event.clientX, y: event.clientY})
//     }
//
//     render() {
//         return (
//             <div onMouseMove={this.handleMouseMove}>
//                 {this.props.render = (this.state)}
//             </div>
//         )
//     }
// }
//
// //这其实还是一个作用域插槽
// ReactDOM.render(<MouseTracker render={(props) => (
//         <div>
//             <h1>移动鼠标!</h1>
//             <p>当前的鼠标位置是 ({props.x}, {props.y})</p>
//         </div>
//     )}/>
//
//     , document.getElementById('root'))


/*render属性-------------------------------------------------------------------*/


/*-----------------------HOC实现--------------------------------*/
//
function withTracker(OldComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {x: 0, y: 0}
    }

    handleMouseMove = (event) => {
      this.setState({x: event.clientX, y: event.clientY})
    }

    render() {
      return <div onMouseMove={this.handleMouseMove}>
        <OldComponent {...this.state} />
      </div>
    }
  }
}

function Welcome(props) {
  return (
      <div>
        <h1>移动鼠标</h1>
        <p>当前的鼠标位置是x={props.x},y={props.y}</p>
      </div>
  )
}

let Tracker = withTracker(Welcome);


ReactDOM.render(
    <Tracker/>
    , document.getElementById('root'));
/*-----------------------HOC实现--------------------------------*/