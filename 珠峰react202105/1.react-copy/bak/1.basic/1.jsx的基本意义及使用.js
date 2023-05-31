import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 老的版本，我们只要用到JSX,就需要在顶部引入React变量
 * 但是在新的版本里，不再需要引入React变量了
 * "start": "set DISABLE_NEW_JSX_TRANSFORM=true&&react-app-rewired start",可以禁用新的转换器，使得继续使用老版 React.createElement
 * JSX  javascript+xml html
 * jsx其实只是react提供的一个语法糖，
 *
 *
 *
 *
 * React元素是构建React应用的最小单位,也就是所谓的虚拟DOM
 * 虚拟DOM
 */
let element = <h1>Hello</h1>;
//jsx在执行的时候其实是一个函数调用，它是一个创建元素的工厂函数
//let element = React.createElement("h1", null, "Hello");
console.log(JSON.stringify(element,null,2));

//所谓的渲染 就是按照 react元素所的描述的结构，创建真实的DOm元素 ， 并插入root容器内
//会由ReactDOM来确浏览器的真实DOM和虚拟DOM是一致
///先有房屋设计 师出设计稿 画纸
//然后建筑工人按图纸的要求，把真实房子盖到指定的地点
ReactDOM.render(
    element,document.getElementById('root')
);

/**
 *
 也就 所谓的虚拟DOM ，其实就是一个普通的JS对象
 jsx element =  {
  "type": "h1",元素的类型
  "props": {//属性
    "id":"title",
    "children": ["Hello","world"]
  },
}

 //"key": null,//是用来共分同一个父亲的不同的儿子的 DOM-DIFF会用到
 //"ref": null,//这个用可以用来获取真的DOM元素 ref会用掉
 */


