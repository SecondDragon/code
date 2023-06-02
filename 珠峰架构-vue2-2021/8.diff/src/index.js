import { initGlobalApi } from "./global-api/index.js";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { stateMixin } from './state'

function Vue(options) {
    // options 为用户传入的选项
    this._init(options); // 初始化操作， 组件
}

// 扩展原型的
initMixin(Vue);
renderMixin(Vue); // _render
lifecycleMixin(Vue); // _update
stateMixin(Vue);

// 在类上扩展的 Vue.mixin
initGlobalApi(Vue);


// import { compileToFunction } from './compiler/index.js';
// import { createElm, patch } from './vdom/patch.js'
// // diff 核心
// let oldTemplate = `<div>
// <li key="C">C</li>
//     <li key="A">A</li>
//     <li key="B">B</li>
//     <li key="D">D</li>
// </div>`; // 在最外层创建了一个根节点 vue3可以 

// let vm1 = new Vue({ data: { message: 'hello world' } })
// const render1 = compileToFunction(oldTemplate)
// const oldVnode = render1.call(vm1); // 虚拟dom
// document.body.appendChild(createElm(oldVnode));

// // v-if   v-else
// let newTemplate = `<div >
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// <li key="A">A</li>
// </div>`;
// let vm2 = new Vue({ data: { message: 'zf' } });
// const render2 = compileToFunction(newTemplate)
// const newVnode = render2.call(vm2); // 虚拟dom
// // 根据新的虚拟节点更新老的节点，老的能复用尽量复用

// setTimeout(() => {
//     patch(oldVnode, newVnode);
// }, 2000);










export default Vue;



// init 主要做了状态的初始化 （数据劫持 对象 、 数组）
// $mount 找render方法  （template-> render函数  ast => codegen =>字符串）
// render = with + new Function(codegen) 产生虚拟dom的方法 
// 虚拟dom -> 真实dom 
// vm._update(vm._render()); 先生成虚拟dom  -》 生成真实的DOM元素
// 初次渲染