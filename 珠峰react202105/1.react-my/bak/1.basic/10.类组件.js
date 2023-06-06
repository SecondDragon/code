import React from './react';
import ReactDOM from './react-dom';

/**
 * 组件分为内置原生组件和自定义组件
 * 内置组件p h1 span type字符串
 * 自定义组件 类型是一个 函数 ,类组件的父类Component的原型上有一个属性isReactComponent={}
 * 自定义组件的名称必须是大写字母开头
 * 自定定组件的返回值有且只能一个根元素
 */
class ClassComponent extends React.Component{
  render(){
    return (
      <h1 style={{color:'red'}} className="title"><span>hello</span>{this.props.name}</h1>
    )
  }
}

let element1 = <ClassComponent name="zhufeng"/>;
ReactDOM.render(element1,document.getElementById('root'));
