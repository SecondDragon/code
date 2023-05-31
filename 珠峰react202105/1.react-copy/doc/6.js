
import React from 'react';
class ClassComponent{
  render(){
      return React.createElement('h1');
  }
}
let element = React.createElement(ClassComponent);
//element={type:ClassComponent} vdom

let functionElement = new ClassComponent().render();
element.oldRenderVdom = functionElement;

let h1Element = functionElement();
functionElement.oldRenderVdom=h1Element;

//element={type:'h1'} renderVdom
//外层的虚拟DOm获取 内层的虚拟DOM，再获取 内层的真实DOM
//element.oldRenderVdom.oldRenderVdom.dom;

