import Collapse from './collapse.js';
import CollapseItem from './collapse-item.js';


window.customElements.define('zf-collapse',Collapse);
window.customElements.define('zf-collapse-item',CollapseItem);


// 设置组件默认显示的状态 

let defaultActive = ['1','2']; // name:1 name:2 默认展开 3 应该隐藏
document.querySelector('zf-collapse').setAttribute('active',JSON.stringify(defaultActive));

// 每个item需要获取到defaultActive 和自己的name属性比较，如果在里面就显示，不在里面就隐藏
document.querySelector('zf-collapse').addEventListener('changeName',(e)=>{
    let {isShow,name} = e.detail;
    if(isShow){
        let index = defaultActive.indexOf(name);
        defaultActive.splice(index,1);
    }else{
        defaultActive.push(name);
    }
    document.querySelector('zf-collapse').setAttribute('active',JSON.stringify(defaultActive));
});

// shadowDOM 完全隔离
// 组件间的通信 属性，事件
// customEvent  -> webcomponent 兼容性差，没有自动更新机制