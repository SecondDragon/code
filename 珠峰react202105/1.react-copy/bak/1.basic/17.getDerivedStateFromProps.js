import React from './react';
import ReactDOM from './react-dom';
class ChildCounter extends React.Component{
  state = {count:0}
  static defaultProps = {// 1.设置默认属性
    name:'ChildCounter'
  }
  componentWillMount(){
    console.log('ChildCounter 1.componentWillMount');
  }
  //getDerivedStateFromProps是为了取代componentWillReceiveProps
  //因为以有很多人在使用componentWillReceiveProps会调用this.setState经常引起死循环
  static getDerivedStateFromProps(nextProps,prevState){
    const {count} = nextProps;
    //return null;//不修改状态
    return {...prevState,count:count*2};//新的状态对象
  }
  render(){
    console.log('ChildCounter 2.render');
    return <div id="ChildCounter">ChildCounter:{this.state.count}</div>
  }
  componentDidMount(){
    console.log('ChildCounter 3.componentDidMount');
  }
  componentWillReceiveProps(){
    console.log('ChildCounter 4.componentWillReceiveProps');
  }
  componentWillUnmount(){
    console.log('ChildCounter 6.componentWillUnmount');
  }
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
  componentWillUpdate(){
    console.log('Counter 6.componentWillUpdate');
  }
  render(){
    console.log('Counter 3.render');
    return (
      <div id="Counter">
        <p>Counter:{this.state.number}</p>
        <ChildCounter count={this.state.number}/>
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
