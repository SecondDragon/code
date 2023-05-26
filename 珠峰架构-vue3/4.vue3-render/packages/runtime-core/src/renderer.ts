import { effect } from "@vue/reactivity/src";
import { ShapeFlags } from "@vue/shared/src";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component";
import { queueJob } from "./scheduler";
import { normalizeVNode ,Text} from "./vnode";

export function createRenderer(rendererOptions) { // 告诉core 怎么渲染

    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
    } = rendererOptions


    // -------------------组件----------------------
    const setupRenderEfect = (instance, container) => {
        // 需要创建一个effect 在effect中调用 render方法，这样render方法中拿到的数据会收集这个effect，属性更新时effect会重新执行

        instance.update = effect(function componentEffect() { // 每个组件都有一个effect， vue3 是组件级更新，数据变化会重新执行对应组件的effect
            if (!instance.isMounted) {
                // 初次渲染
                let proxyToUse = instance.proxy;
                // $vnode  _vnode 
                // vnode  subTree
                let subTree = instance.subTree = instance.render.call(proxyToUse, proxyToUse);

                // 用render函数的返回值 继续渲染
                patch(null, subTree, container);
                instance.isMounted = true;
            } else {
                // diff算法  （核心 diff + 序列优化 watchApi 生命周期）  
                // ts 一周
                // 组件库
                // 更新逻辑
            }
        },{
            scheduler:queueJob
        });
    }
    const mountComponent = (initialVNode, container) => {
        // 组件的渲染流程  最核心的就是调用 setup拿到返回值，获取render函数返回的结果来进行渲染 
        // 1.先有实例
        const instance = (initialVNode.component = createComponentInstance(initialVNode))
        // 2.需要的数据解析到实例上
        setupComponent(instance); // state props attrs render ....
        // 3.创建一个effect 让render函数执行
        setupRenderEfect(instance, container);
    }
    const processComponent = (n1, n2, container) => {
        if (n1 == null) { // 组件没有上一次的虚拟节点
            mountComponent(n2, container);
        } else {
            // 组件更新流程 
        }
    }
    // ------------------组件 ------------------


    //----------------- 处理元素-----------------
    const mountChildren = (children, container) => {
        for (let i = 0; i < children.length; i++) {

            let child = normalizeVNode(children[i]);
            patch(null, child, container);
        }
    }
    const mountElement = (vnode, container) => {
        // 递归渲染
        const { props, shapeFlag, type, children } = vnode;
        let el = (vnode.el = hostCreateElement(type));

        if (props) {
            for (const key in props) {
                hostPatchProp(el, key, null, props[key]);
            }
        }
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children);// 文本比较简单 直接扔进去即可
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el);
        }
        hostInsert(el, container);
    }
    const processElement = (n1, n2, container) => {
        if (n1 == null) {
            mountElement(n2, container);
        } else {
            // 元素更新
        }
    }
    //----------------- 处理元素-----------------

    // -----------------文本处理-----------------
    const processText = (n1,n2,container) =>{
        if(n1 == null){
            hostInsert((n2.el = hostCreateText(n2.children)),container)
        }
    }
     // -----------------文本处理-----------------
    const patch = (n1, n2, container) => {
        // 针对不同类型 做初始化操作
        const { shapeFlag,type } = n2;
        switch (type) {
            case Text:
                processText(n1, n2, container);
                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {
                    processElement(n1, n2, container);
                } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                    processComponent(n1, n2, container);
                }
        }
       
    }
    const render = (vnode, container) => {
        // core的核心, 根据不同的虚拟节点 创建对应的真实元素

        // 默认调用render 可能是初始化流程
        patch(null, vnode, container)
    }
    return {
        createApp: createAppAPI(render)
    }
}
// createRenderer 目的是创建一个渲染器

// 框架 都是将组件 转化成虚拟DOM -》 虚拟DOM生成真实DOM挂载到真实页面上