import React from './react';
import ReactDOM from './react-dom';
class ChildCounter extends React.Component{
  static defaultProps = {// 1.设置默认属性
    name:'ChildCounter'
  }
  componentWillMount(){
    console.log('ChildCounter 1.componentWillMount');
  }
  render(){
    console.log('ChildCounter 2.render');
    return <div id="ChildCounter">ChildCounter:{this.props.count}</div>
  }
  componentDidMount(){
    console.log('ChildCounter 3.componentDidMount');
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('ChildCounter 5.shouldComponentUpdate');
    return nextProps.count%3 === 0;//如果是3的倍数就更新，否则不更新
  }
  componentWillReceiveProps(){
    console.log('ChildCounter 4.componentWillReceiveProps');
  }
  componentWillUnmount(){
    console.log('ChildCounter 6.componentWillUnmount');
  }
}
function FunctionChildCounter(props){
  return <div id="functionChildCounter">{props.count}</div>
}
class Counter extends React.Component{
  static defaultProps = {// 1.设置默认属性
    name:'Counter'
  }
  constructor(props){
    super(props);
    this.state = {number:0};//2.设置默认状态
    console.log('Counter 1.constructor');
  }
  componentWillMount(){
    console.log('Counter 2.componentWillMount');
  }
  handleClick = (event)=>{
    this.setState({number:this.state.number+1});
  }
  //setState会引起状态的变化,父组件更新的时候，会让子组件的属性发生变化
  //当属性或者状态发生改变的话，会走此方法来决定 是否要渲染更新
  shouldComponentUpdate(nextProps,nextState){
    console.log('Counter 5.shouldComponentUpdate');
    return nextState.number%2 === 0;//奇数不更新，偶数更新
  }
  componentWillUpdate(){
    console.log('Counter 6.componentWillUpdate');
  }
  render(){
    console.log('Counter 3.render');
    return (
      <div id="Counter">
        <p>Counter:{this.state.number}</p>
        {this.state.number === 4?null:<ChildCounter count={this.state.number}/>}
        <FunctionChildCounter count={this.state.number}/>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
  componentDidUpdate(){
    console.log('Counter 7.componentDidUpdate');
  }
  componentDidMount(){
    console.log('Counter 4.componentDidMount');
  }
}

ReactDOM.render(<Counter/>,document.getElementById('root'));
