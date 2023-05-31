import React from './react';
import ReactDOM from './react-dom';

function withTracker(OldComponent){
  return class extends React.Component{
    state = {
      x:0,y:0
    }
    handleMouseMove = (event)=>{
      this.setState({
        x:event.clientX,
        y:event.clientY
      });
    }
    render(){
      return (
        <div onMouseMove={this.handleMouseMove}>
          <OldComponent {...this.state}/>
        </div>
      )
    }
  }
}
function Welcome(props){
  return (
    <div>
      <h1>移动鼠标</h1>
      <p>当前的鼠标位置是x={props.x},y={props.y}</p>
    </div>
  )
}
let Tracker = withTracker(Welcome);
ReactDOM.render(
<Tracker />
, document.getElementById('root'));
