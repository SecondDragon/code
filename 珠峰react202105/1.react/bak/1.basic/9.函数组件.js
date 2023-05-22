import React from './react';
import ReactDOM from './react-dom';

/**
 * 函数组件其实是一个函数，接收props,返回一个React元素
 */
function FunctionComponent(props){
  let element =  <h1><span>hello</span>,{props.name}</h1>;
  console.log(element);
  return element;
  //return React.createElement("h1", null, "hello,", props.name);
}
//let element = <Welcome name="zhufeng"/>;
let element = React.createElement(FunctionComponent,{name:'zhufeng'});
console.log(element);
//实现render方法，把React元素变成真实的DOM元素插入页面root里

ReactDOM.render(element,document.getElementById('root'));
