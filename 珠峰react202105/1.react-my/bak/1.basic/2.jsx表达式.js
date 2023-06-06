import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 1.JSX表达式 表达式就是变量 常量 操作符 混和在一起的组合
 * 表达式是可以计算的，而且 肯定会有一个返回值
 * jsx更像JS
 * class => className for=>htmlFor
 */
let title = 'hello';
let style = {backgroundColor:'green',color:'red'};
let element = <h1 style={style} className="active">{title+'world'}</h1>
ReactDOM.render(
  element,document.getElementById('root')
);

