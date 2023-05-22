import React from 'react';
import ReactDOM from 'react-dom';
let names = ['张三','李四','王五'];

let elements = [];
//这个for就是非常纯的JS语法
for(let i=0;i<names.length;i++){
  elements.push(<h1>{names[i]}</h1>);
}
ReactDOM.render(
  elements,document.getElementById('root')
);
