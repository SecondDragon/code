import React from './react';
import ReactDOM from './react-dom';
class Counter extends React.Component{
  static defaultProps = {// 1.设置默认属性
    name:'珠峰架构'
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
      <div>
        <p>{this.props.name}:{this.state.number}</p>
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
