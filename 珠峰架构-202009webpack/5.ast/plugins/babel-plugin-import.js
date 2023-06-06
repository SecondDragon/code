

let t = require('babel-types');//类型判断某个节点是否是某种类型,或者创建一个新的某种类型的节点

let visitor = {
    ImportDeclaration:{
        enter(path,state={opts}){
            const specifiers = path.node.specifiers;//[ImportSpecifier flatten,ImportSpecifier concat]
            const source = path.node.source;//StringLiteral lodash
            //如果导入的不是以默认导入的话才会进来转换,如果已经是默认导入了,则不转换,只处理非默认导入的
            if(state.opts.libraries.includes(source.value) && !t.isImportDefaultSpecifier(specifiers[0])){
                const declarations= specifiers.map((specifier,index)=>{
                    return t.importDeclaration([t.importDefaultSpecifier(specifier.local)],
                     t.stringLiteral(`${source.value}/${specifier.imported.name}`));//lodash/flatten//TODO
                });
                path.replaceWithMultiple(declarations);
            }
        }
    }
}
module.exports = function(){
    return {
        visitor
    }
}