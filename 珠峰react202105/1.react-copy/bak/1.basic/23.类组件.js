import React from './react';
import ReactDOM from './react-dom';
class SubCounter extends React.PureComponent{
  render(){
    console.log('SubCounter render');
    return <div>{this.props.count}</div>
  }
}
class Counter extends React.PureComponent{
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
        <SubCounter count={this.state.number}/>
      </div>
     )
   }
}
ReactDOM.render(
<Counter />
, document.getElementById('root'));
