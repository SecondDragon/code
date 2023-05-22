import React from 'react';
import ReactDOM from 'react-dom';

/**
 * JSX可以作为函数的参数和返回值
 */
function greeting(name){
  if(name){
    return <h1>hello,{name}</h1>
  }else{
    return <h1>hello,Stranger</h1>
  }
}
let element = greeting('zhufeng');
ReactDOM.render(
  element,document.getElementById('root')
);
