import React from 'react';
import ReactDOM from 'react-dom';
function SubCounter(props){
  debugger
  console.log('SubCounter render');
  return <div>{props.count}</div>
}
//性能优化
/* let MemoSubCounter = React.memo(SubCounter,(prevProps,nextProps)=>{
  return JSON.stringify(prevProps)=== JSON.stringify(nextProps);
}); */
let MemoSubCounter = React.memo(SubCounter);
console.log(MemoSubCounter);
class Counter extends React.Component{
  state = {number:0}
  inputRef = React.createRef();
   handleClick = (event)=>{
    let amount = Number(this.inputRef.current.value);
    this.setState({number:this.state.number+amount});
   }
   render(){
     console.log('Counter render');
     return (
      <div>
        <p>{this.state.number}</p>
        <input ref={this.inputRef}/>
        <button onClick={this.handleClick}>+</button>
        <MemoSubCounter count={this.state.number}/>
      </div>
     )
   }
}
ReactDOM.render(
<Counter />
, document.getElementById('root'));


//深比较 immer 实现深比较性能会比较好