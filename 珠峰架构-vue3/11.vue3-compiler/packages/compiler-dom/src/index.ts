export const enum NodeTypes {
    ROOT,
    ElEMENT,
    TEXT,
    SIMPLE_EXPRESSION = 4,
    INTERPOLATION = 5,
    ATTRIBUTE = 6,
    DIRECTIVE = 7,
    COMPOUND_EXPRESSION = 8,
    TEXT_CALL = 12,
    VNODE_CALL = 13,
}

function isEnd(context) { // 是不是解析完毕 ：解析完毕的核心就是context.source = ''
    const source = context.source;
    if(source.startsWith('</')){
        return true
    }
    return !source
}

function advanceSpaces(context){
    const match = /^[ \t\r\n]+/.exec(context.source);
    if(match){
       advanceBy(context, match[0].length)
    }
}
function parseTag(context){
    const start = getCursor(context); //<div/>
    // 最基本的元字符
    const match = /^<\/?([a-z][^ \t\r\n/>]*)/.exec(context.source); // igm
    const tag = match[1];
    advanceBy(context,match[0].length);
    advanceSpaces(context);

    const isSelfClosing = context.source.startsWith('/>');
    advanceBy(context,isSelfClosing?2:1);
    return {
        type:NodeTypes.ElEMENT,
        tag,
        isSelfClosing,
        loc:getSelection(context,start)
    }
}
function parseElement(context) {
    // 1.解析标签名 
    let ele:any = parseTag(context); // <div></div>

    // 这里可能有儿子？
    const children = parseChildren(context); // 这里处理儿子的时候 有可能没有儿子，那就直接跳出？ 如果遇到结束标签就直接跳出就好了

    if(context.source.startsWith('</')){
        parseTag(context); // 解析关闭标签时 同时会移除关闭信息并且更新偏移量
    }
    ele.children = children;
    ele.loc = getSelection(context,ele.loc.start)
    return ele;
}


function parseInterpolation(context) { // }}  {{name}}
    const start = getCursor(context); // 获取表达式的start位置
    const closeIndex = context.source.indexOf('}}', '{{')

    advanceBy(context, 2);
    const innerStart = getCursor(context);
    const innerEnd = getCursor(context); // 这个end稍后我们会改
    const rawContentLength = closeIndex - 2;// 拿到{{ 内容 }}  包含空格的

    const preTrimContent = parseTextData(context,rawContentLength)  
    const content = preTrimContent.trim(); // 去掉前后空格  "  name  "  name
    const startOffset = preTrimContent.indexOf(content); // {{  name  }}
    if(startOffset > 0){ // 有前面空格
        advancePositionWithMutation(innerStart,preTrimContent,startOffset)
    }
    // 在去更新innerEnd ？ 
    const endOffset = content.length + startOffset
    advancePositionWithMutation(innerEnd,preTrimContent,endOffset)
    advanceBy(context,2);
    return {
        type:NodeTypes.INTERPOLATION,
        content:{
            type:NodeTypes.SIMPLE_EXPRESSION,
            isStatic:false,
            loc: getSelection(context,innerStart,innerEnd)
        },
        loc:getSelection(context,start)
    }
}



function getCursor(context) {
    let { line, column, offset } = context;
    return { line, column, offset }
}

function advancePositionWithMutation(context, s, endIndex) {
    // 如何更新时第几行?
    let linesCount = 0;
    let linePos = -1;
    for (let i = 0; i < endIndex; i++) {
        if (s.charCodeAt(i) == 10) { // 遇到换行就涨一行
            linesCount++;
            linePos = i; // 换行后第一个人的位置 
        }
    }
    context.offset += endIndex;
    context.line += linesCount;
    context.column = linePos == -1 ? context.column + endIndex : endIndex - linePos
    // 如何更新列数
    // 更新偏移量
}
function advanceBy(context, endIndex) {
    let s = context.source;// 原内容
    // 计算出一个新的结束位置
    advancePositionWithMutation(context, s, endIndex); // 根据内容和结束索引来修改上下文的信息
    context.source = s.slice(endIndex); // 截取内容
}

function parseTextData(context, endIndex) {
    const rawText = context.source.slice(0, endIndex);
    advanceBy(context, endIndex); // 在context.source中把文本内容删除掉
    return rawText
}
function getSelection(context, start,end?) { // 获取这个信息对应的开始、结束、内容
     end = end || getCursor(context)
    return {
        start,
        end,
        source: context.originalSource.slice(start.offset, end.offset)
    }
}
function parseText(context) { // 1.先做文本处理
    const endTokens = ['<', '{{'];
    let endIndex = context.source.length; // 文本的整个长度
    // 假设法 需要先假设 遇到 <  是结尾  在拿到遇到{{  去比较那个 在前 就是到哪
    for (let i = 0; i < endTokens.length; i++) {
        const index = context.source.indexOf(endTokens[i], 1);
        if (index !== -1 && endIndex > index) {
            endIndex = index;
        }
    }
    // 有了文本的结束位置 我就可以更新行列信息 
    let start = getCursor(context);
    const content = parseTextData(context, endIndex);
    return {
        type: NodeTypes.TEXT,
        content,
        loc: getSelection(context, start)
    }
}
function parseChildren(context) { // 根据内容做不同的处理
    const nodes = [];
    while (!isEnd(context)) {
        const s = context.source; // 当前上下文中的内容  <  abc  {{}}
        let node;
        if (s[0] == '<') { // 标签
            node = parseElement(context)
        } else if (s.startsWith('{{')) { // 表达式  
            node = parseInterpolation(context);
        } else {
            node = parseText(context);
        }
        nodes.push(node)
    }
    nodes.forEach((node,index)=>{
        if(node.type === NodeTypes.TEXT){
            if(!/[^ \t\r\n]/.test(node.content)){ // 只要没有内容，就删除掉
                nodes[index] = null
            }else{
                node.content = node.content.replace(/[ \t\r\n]+/g,' ')
            }
        }
    })
    return nodes.filter(Boolean); // 过滤null值
}
function createParserContext(content) {
    return {
        line: 1,
        column: 1,
        offset: 0,
        source: content, // 这个source会被不停的移除？  等待source为空的时候解析完毕
        originalSource: content // 这个值是不会变的 记录你传入的内容
    }
}

function createRoot(children,loc){
    return {
        type:NodeTypes.ROOT,
        children,
        loc
    }
}
function baseParse(content) {
    // 标识节点的信息 行、列、偏移量...
    // 我每解析一段 就移除一部分 
    
    const context = createParserContext(content);
    const start = getCursor(context); // 记录开始位置
    return createRoot(parseChildren(context),getSelection(context,start))
}

export function baseCompile(template) {
    // 讲模板转换成ast语法树
    const ast = baseParse(template);
    return ast
}

 
// 从 template - > ast语法树   (vue里面 有指令 有插槽 有事件)
// ast - > transform -> codegen 
