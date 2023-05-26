// createVNode  创建虚拟节点

import { isArray, isObject, isString, ShapeFlags } from "@vue/shared/src";

export function isVnode(vnode){
    return vnode.__v_isVnode
}
// h(‘div',{style:{color:red}},'children'); //  h方法和createApp类似
export const createVNode = (type,props,children = null) =>{
    // 可以根据type 来区分是组件 还是普通的元素

    // 根据type来区分 是元素还是组件

    // 给虚拟节点加一个类型
    const shapeFlag = isString(type) ? 
        ShapeFlags.ELEMENT : isObject(type)? 
            ShapeFlags.STATEFUL_COMPONENT : 0


    const vnode = { // 一个对象来描述对应的内容 ， 虚拟节点有跨平台的能力
        __v_isVnode:true,// 他是一个vnode节点
        type,
        props,
        children,
        component:null, // 存放组件对应的实例
        el:null, // 稍后会将虚拟节点和真实节点对应起来
        key: props && props.key,// diff算法会用到key
        shapeFlag // 判断出当前自己的类型 和 儿子的类型
    } 
    normalizeChildren(vnode,children);
    return vnode;
}

function normalizeChildren(vnode,children){
    let type = 0;
    if(children == null){ // 不对儿子进行处理

    } else if(isArray(children)){
        type = ShapeFlags.ARRAY_CHILDREN;
    } else{
        type = ShapeFlags.TEXT_CHILDREN;
    }
    vnode.shapeFlag |=  type
}
export const Text = Symbol('Text')
export function normalizeVNode(child){
    if(isObject(child)) return child;

    return createVNode(Text,null,String(child));
}