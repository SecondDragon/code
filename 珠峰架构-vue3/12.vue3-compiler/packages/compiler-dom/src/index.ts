
import { baseParse, NodeTypes } from "./parse";
import { CREATE_BLOCK, CREATE_TEXT, CREATE_VNODE, FRAGMENT, getBaseTransformPreset, OPEN_BLOCK, TO_DISPALY_STRING, transform } from "./transform";

export const helperNameMap: any = {
    [FRAGMENT]: `Fragment`,
    [OPEN_BLOCK]: `openBlock`,
    [CREATE_BLOCK]: `createBlock`,
    [CREATE_VNODE]: `createVNode`,
    [TO_DISPALY_STRING]: "toDisplayString",
    [CREATE_TEXT]: "createTextVNode"
}
function createCodegenContext(ast) {
    const newLine = (n) => {
        context.push('\n' + '  '.repeat(n))
    }
    const context = {
        code: ``, // 拼的结果
        push(c) { // 拼接代码
            context.code += c;
        },
        helper(key){
            return  `${helperNameMap[key]}`;
        },
        indentLevel: 0, // 缩进几次
        newLine() {
            newLine(context.indentLevel); // 换行
        },
        indent() {
            newLine(++context.indentLevel); // 缩进
        },
        deindent() {
            newLine(--context.indentLevel);
        }
    }
    return context
}
function genVNodeCall(node,context){
    const {push,helper} = context;
    const {tag,children,props,patchFlag,isBlock} = node
    if(isBlock){
        push(`(${helper(OPEN_BLOCK)}(),`) 
        // 后面递归处理即可
    }
}
function genNode(node, context) {
    switch (node.type) {    
        case NodeTypes.VNODE_CALL:
            debugger;
            genVNodeCall(node, context)         
            break;
        case NodeTypes.ElEMENT:
            break;
        case NodeTypes.TEXT:
            break;
        case NodeTypes.INTERPOLATION:
            break
        case NodeTypes.SIMPLE_EXPRESSION:
            break;
        case NodeTypes.COMPOUND_EXPRESSION:
            break;
        case NodeTypes.TEXT_CALL:
            break;
        case NodeTypes.JS_CALL_EXPRESSION:
            break;
    }
}
function generate(ast) {
    const context = createCodegenContext(ast);
    const { push, newLine, indent, deindent } = context;
    push(`const _Vue = Vue`);
    newLine();
    push(`return function render(_ctx){`);
    indent();
    push(`with (_ctx) {`)
    indent()
    push(`const {${ast.helpers.map(s => `${helperNameMap[s]}`).join(',')}} = _Vue`);
    newLine()
    push(`return `); //需要根据转化后的结果 生成字符串
    genNode(ast.codegenNode, context);
    deindent();
    push(`}`)
    deindent();
    push(`}`);
    return context.code
}


export function baseCompile(template) {
    // 讲模板转换成ast语法树
    const ast = baseParse(template);
    // 将ast语法进行转化 （优化 静态提升 方法缓存  生成代码为了最终生成代码时使用）
    const nodeTransforms = getBaseTransformPreset(); // nodeTransforms 每遍历到一个节点都要调用里面的方法
    transform(ast, nodeTransforms);
    // 根节点 的处理我在最外面 进行了一次包裹
    return generate(ast); // 在生成的过程中 需要创建一个字符串拼接后的结果
}


// 最终结果还是new Function


// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
