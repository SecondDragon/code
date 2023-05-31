import React from './react';
import ReactDOM from './react-dom';

/* let element = (
  <div className="title" style={{color:'red'}}>
    <span>hello</span>world
  </div>
) */


// 两个核心
//1.实现React.createElement方法，返回一个React元素
let element = React.createElement("div",
    {
        className: "title",
        style: {
            color: 'red'
        }
    },
    //看来真的会有多个儿子
    React.createElement("span", null, "hello"),
    "world"
);


console.log(JSON.stringify(element, null, 2));


//2.实现render方法，把React元素变成真实的DOM元素插入页面root里
ReactDOM.render(element, document.getElementById('root'));

/**
 {
  "type": "div",
  "props": {
    "className": "title",
    "style": {
      "color": "red"
    },
    "children": [
      {
        "type": "span",
        "props": {
          "children": "hello"
        },
      },
      "world"
    ]
  }
}
 */