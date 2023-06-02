import Watcher from "./observer/watcher";
import { nextTick } from "./utils";
import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        // 既有初始化 又又更新 
        const vm = this;
        const prevVnode = vm._vnode; // 表示将当前的虚拟节点保存起来

        if(!prevVnode){ // 初次渲染
            vm.$el = patch(vm.$el, vnode);
        }else{
            vm.$el = patch(prevVnode,vnode);
        }
        vm._vnode = vnode
    }
    Vue.prototype.$nextTick = nextTick
}
// 后续每个组件渲染的时候都会有一个watcher
export function mountComponent(vm, el) {

    // 更新函数 数据变化后 会再次调用此函数
    let updateComponent = () => {
        // 调用render函数，生成虚拟dom
        vm._update(vm._render()); // 后续更新可以调用updateComponent方法
        // 用虚拟dom 生成真实dom
    }
    // 观察者模式： 属性是“被观察者”  刷新页面：“观察者”
    // updateComponent();
    callHook(vm,'beforeMount')
    new Watcher(vm,updateComponent,()=>{
        console.log('更新视图了')
    },true); // 他是一个渲染watcher  后续有其他的watcher

    callHook(vm,'mounted')
}

export function callHook(vm,hook){
    let handlers = vm.$options[hook];
    if(handlers){
        for(let i =0; i < handlers.length;i++){
            handlers[i].call(vm)
        }
    }
}