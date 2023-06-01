import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 类组件的数据来源有两个地方 父组件传过来的属性，自己内部的状态
 * 属性(props)是父组件传递过来的
 * 状态(state)是自己内部的,改变状态唯一的方式就是setState
 * 属性和状态发生变化后组件都会更新，视图都会渲染
 * 定义状态的方法只有两个，一个是在构造函数中 一个是在事件处理函数中
 */
class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date:new Date()};//唯一可以给状态直接赋值的地方就是构造函数
  }
  //组件挂载完成
  componentDidMount(){
    this.timer = setInterval(this.tick,1000);
  }
  //组件将要卸载
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  //类的属性 这样写法函数里的this永远指向组件的实例
  tick = ()=>{
    //Do not mutate state directly. Use setState().
    //this.state = {date:new Date()};
    //this.state.date = new Date();
    //setState可以修改状态，另外可以让组件刷新
    // this.setState({date:new Date()});
    //this.state.date = new Date();
    //this.setState({});
  }
  render(){
    return (
        <div>
          <h1>Hello World</h1>
          <h2>现在时间是:{this.state.date.toLocaleTimeString()}</h2>
        </div>
    )
  }
}

ReactDOM.render(<Clock/>,document.getElementById('root'));
