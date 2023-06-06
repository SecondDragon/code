import { initGlobalAPI } from "./gloablAPI";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";

import { initStateMixin } from "./state";

import { compileToFunction } from './compiler'
import { createElm, patch } from "./vdom/patch";

// 将所有的方法都耦合在一起
function Vue(options) { // options就是用户的选项
    this._init(options); // 默认就调用了init
}


initMixin(Vue); // 扩展了init方法
initLifeCycle(Vue); // vm_update  vm._render
initGlobalAPI(Vue) // 全局api的实现
initStateMixin(Vue); // 实现了nextTick $watch


// ------------- 为了方便观察前后的虚拟节点-- 测试的-----------------

let render1 = compileToFunction(`<ul  a="1" style="color:blue">
    <li>a</li>
    <li>b</li>
    <li>c</li>
    <li>d</li>
</ul>`);
let vm1 = new Vue({ data: { name: 'zf' } })
let prevVnode = render1.call(vm1)

let el = createElm(prevVnode);
document.body.appendChild(el)



let render2 = compileToFunction(`<ul  a="1"  style="color:red;">
    <li >e</li>
    <li>m</li>
    <li>p</li>
    <li >q</li>
    
</ul>`);
let vm2 = new Vue({ data: { name: 'zf' } })
let nextVnode = render2.call(vm2);


// 直接将新的节点替换掉了老的，  不是直接替换 而是比较两个人的区别之后在替换.  diff算法
// diff算法是一个平级比较的过程 父亲和父亲比对， 儿子和儿子比对 

setTimeout(() => {
    patch(prevVnode, nextVnode)


    // let newEl = createElm(nextVnode);
    // el.parentNode.replaceChild(newEl,el)
}, 1000)





export default Vue