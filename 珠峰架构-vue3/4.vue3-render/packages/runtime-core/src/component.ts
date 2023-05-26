// 组件中所有的方法

import { isFunction, isObject, ShapeFlags } from "@vue/shared/src";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";


export function createComponentInstance(vnode) {
    // webcomponent 组件需要有“属性” “插槽”
    const instance = { // 组件的实例
        vnode,
        type: vnode.type, // 用户写的对象
        props: {}, // props attrs 有什么区别 vnode.props
        attrs: {},
        slots: {},
        ctx: {},
        data:{},
        setupState: {}, // 如果setup返回一个对象，这个对象会作为setUpstate
        render: null,
        subTree:null, // render函数的返回结果就是subTree
        isMounted: false // 表示这个组件是否挂载过
    }
    instance.ctx = { _: instance } // instance.ctx._
    return instance;
}

export function setupComponent(instance) {
    const { props, children } = instance.vnode; // {type,props,children}

    // 根据props 解析出 props 和 attrs，将其放到instance上
    instance.props = props; // initProps()
    instance.children = children; // 插槽的解析 initSlot()

    // 需要先看下 当前组件是不是有状态的组件， 函数组件

    let isStateful = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
    if (isStateful) { // 表示现在是一个带状态的组件
        // 调用 当前实例的setup方法，用setup的返回值 填充 setupState和对应的render方法
        setupStatefulComponent(instance)
    }
}
function setupStatefulComponent(instance) {
    // 1.代理 传递给render函数的参数
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers as any)
    // 2.获取组件的类型 拿到组件的setup方法
    let Component = instance.type
    let { setup } = Component;
    // ------ 没有setup------
    if(setup){
        let setupContext = createSetupContext(instance);
        const setupResult = setup(instance.props, setupContext); // instance 中props attrs slots emit expose 会被提取出来，因为在开发过程中会使用这些属性

        handleSetupResult(instance,setupResult)

    }else{
        finishComponentSetup(instance);// 完成组件的启动
    }
}
function handleSetupResult(instance,setupResult){
    if(isFunction(setupResult)){
        instance.render = setupResult
    }else if(isObject(setupResult)){
        instance.setupState = setupResult
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance){
    let Component = instance.type
    if(!instance.render){
        // 对template模板进行编译 产生render函数
        // instance.render = render;// 需要将生成render函数放在实例上
        if(!Component.render && Component.template){
            // 编译 将结果 赋予给Component.render
        }
        instance.render = Component.render;
    }

    // 对vue2.0API做了兼容处理
    // applyOptions 
}
function createSetupContext(instance) {
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: () => { },
        expose: () => { }
    }
}
// 他们的关系涉及到后面的使用
// instance 表示的组件的状态 各种各样的状态，组件的相关信息 
// context 就4个参数 是为了开发时使用的
// proxy 主要为了取值方便  =》 proxy.xxxx