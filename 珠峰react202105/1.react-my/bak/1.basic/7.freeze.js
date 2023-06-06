import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 元素的更新
 * React元素本身是不可变的
 */
let element = <h1 id="title">hello</h1>;
console.log(JSON.stringify(element,null,2));

ReactDOM.render(
  element,document.getElementById('root')
);

setTimeout(()=>{
  //Uncaught TypeError: Cannot assign to read only property 'children' of object '#<Object>'
  //element.props.children = 'world';
  //element.type  = 'p';
  //这个对象是不可扩展的，不行
  //这个不可扩展这个特性也是React17新加入的，17以前
  //Cannot add property something, object is not extensible
  //element.something = 'id';
  let element = <p id="title">hello</p>;
  ReactDOM.render(
    element,document.getElementById('root')
  );
},2000);