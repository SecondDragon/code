import { PatchFlags } from "@vue/shared/src";
import { NodeTypes } from "./parse";

export const CREATE_VNODE = Symbol('createVnode');
export const TO_DISPALY_STRING = Symbol('toDisplayString');
export const OPEN_BLOCK = Symbol('openBlock');
export const CREATE_BLOCK = Symbol('createBlock')
export const FRAGMENT = Symbol('Fragment');
export const CREATE_TEXT = Symbol('createTextVNode');

function createVnodeCall(context, tag, props, children, patchFlag) {
    context.helper(CREATE_VNODE);
    return {
        type: NodeTypes.VNODE_CALL,
        tag,
        props,
        children,
        patchFlag
    }
}
function transformElement(node, context) { // 专门处理元素的

    // 希望在整个树处理完毕后 在处理元素 
    if (node.type != NodeTypes.ElEMENT) { // 此节点是元素
        return;
    }
    // ...
    return () => { // 退出函数  洋葱模型 
        // createVnode('h1',{},'helloworld',1) 向helper中添加一个createVnode
        const { tag, children } = node
        let vnodeTag = `'${tag}'`
        let vnodeProps; // props处理是想对复杂
        let vnodeChildren;  // 处理好的儿子
        let vnodePatchFlag;
        let patchFlag = 0; // 用于标记这个标签是不是动态的
        if (children.length > 0) {
            if (children.length == 1) {
                const child = children[0];
                const type = child.type;// 看一下他是不是动态
                const hasDymanicTextChild = type === NodeTypes.INTERPOLATION || type === NodeTypes.COMPOUND_EXPRESSION;
                if (hasDymanicTextChild) {
                    patchFlag |= PatchFlags.TEXT
                }
                vnodeChildren = child; // 直接把一个儿子拿出来即可
            } else {
                vnodeChildren = children; // 多个儿子 不用处理
            }
        }
        if (patchFlag !== 0) {
            vnodePatchFlag = patchFlag + ''
        }
        node.codegenNode = createVnodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag);
        console.log(context)
    }
}

function isText(node) {
    return node.type === NodeTypes.INTERPOLATION || node.type == NodeTypes.TEXT
}

function createCallExpression(callee, args) {
    return {
        type: NodeTypes.JS_CALL_EXPRESSION,
        callee,
        arguments: args
    }
}
function transformText(node, context) { // 专门处理文本

    // {{name}} hello  => [children,children]  => createTextNode(name + ‘hello’) 
    if (node.type == NodeTypes.ROOT || node.type == NodeTypes.ElEMENT) {
        // ...
        return () => {
            // 对元素中的文本进行合并操作
            let hasText = false;
            let children = node.children;
            let container = null;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (isText(child)) { // "hello hello" + name (div) +world+ 'hello'
                    hasText = true; // 当前元素确实有文本，我需要合并
                    for (let j = i + 1; j < children.length; j++) {
                        const next = children[j];
                        if (isText(next)) {
                            if (!container) {
                                container = children[i] = {
                                    type: NodeTypes.COMPOUND_EXPRESSION,
                                    loc: child.loc,
                                    children: [child]
                                }
                                container.children.push(`+`, next);
                                children.splice(j, 1);
                                j--;
                            }
                        } else {
                            container = null;
                            break; // 跳过
                        }
                    }
                }
            }
            // 文本需要增加 createText方法 helper里增加
            // <div>hello</div> 
            if (!hasText || children.length == 1) { // 只有一个孩子 在代码执行的时候 可以直接innerHTML 无需createText
                return;
            }
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (isText(child) || child.type == NodeTypes.COMPOUND_EXPRESSION) {
                    const callArgs = []; // 用于存放参数的
                    callArgs.push(child); // 文本内容
                    if (child.type !== NodeTypes.TEXT) {
                        callArgs.push(PatchFlags.TEXT + '');
                    }
                    children[i] = { // createTextNode('')
                        type: NodeTypes.TEXT_CALL,
                        content: child,
                        loc: child.loc,
                        codegenNode: createCallExpression( // 用于最后生成代码的
                            context.helper(CREATE_TEXT),
                            callArgs
                        )
                    }
                }
            }
        }
    }
}

// 树结构  树的每一个节点进行转化
export function getBaseTransformPreset() { // 很多转化的方法
    return [
        // 方法1 。。。
        transformElement,
        transformText
    ]
}
export function createTransformContext(root, nodeTransforms) {
    const context = {
        root,
        currentNode: root, // 当前节点 会随着树的遍历而更新
        nodeTransforms, //  上下文的目的时为了传参方法
        helpers: new Set(),
        helper(name) { // 代码中用到了具体方法 需要调用此方法 将对应的名字加入到helpers
            context.helpers.add(name);
            return name;
        }
    };
    return context
}
function traverseChildren(node, context) { // 深度优先
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        traverseNode(child, context);
    }
}
function traverseNode(node, context) {
    const { nodeTransforms } = context;
    context.currentNode = node;
    const exits = [];
    for (let i = 0; i < nodeTransforms.length; i++) {
        const onExit = nodeTransforms[i](node, context);
        if (onExit) exits.push(onExit)
    }
    switch (node.type) {
        case NodeTypes.ROOT:
        case NodeTypes.ElEMENT:
            traverseChildren(node, context);
        case NodeTypes.INTERPOLATION:  // name => {obj:aaa}.TOsTRING
            context.helper(TO_DISPALY_STRING)
    }
    let i = exits.length;

    // 为了保证退出方法对应的context.currentNode是正确的
    context.currentNode = node;
    while (i--) {
        exits[i]();
    }
}

function createRootCodegen(root, context) {
    const { helper } = context;
    const children = root.children;
    helper(OPEN_BLOCK)
    helper(CREATE_BLOCK)
    if (children.length == 1) {
        const child = children[0]; // 直接以当前这个孩子作为根节点
        const codegen = child.codegenNode; // 获取刚才元素转化后的codegen
        codegen.isBlock = true; // 只有一个儿子 那么他就是blocktree的根节点
       
        root.codegenNode = codegen // 一个儿子直接把儿子的codegen挂载到最外层上
    } else if (children.length > 1) {
        root.codegenNode = createVnodeCall(
            context, helper(FRAGMENT),
            undefined,
            children,
            PatchFlags.STABLE_FRAGMENT)
        root.codegenNode.isBlock=  true;
    }
   

}

export function transform(root, nodeTransforms) {
    const context = createTransformContext(root, nodeTransforms);
    traverseNode(root, context);
    createRootCodegen(root, context);

    root.helpers = [...context.helpers] // context的属性 放到helpers上

}
