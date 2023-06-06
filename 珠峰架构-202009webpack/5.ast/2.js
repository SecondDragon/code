let babel = require('@babel/core');//可以源代码转成AST语法树
let t = require('babel-types');//类型判断某个节点是否是某种类型,或者创建一个新的某种类型的节点
let arrowFunctionPlugin = require('@babel/plugin-transform-arrow-functions');
const code = `const sum = (a,b)=>{
    console.log(this);
    return a+b;
}`;
let arrowFunctionPlugin2 = {
    visitor:{
      ArrowFunctionExpression(path){
          const id = t.identifier('_this');
          path.parentPath.scope.push({id,init:t.thisExpression()});
          path.node.type = 'FunctionExpression';
          path.traverse({
            ThisExpression(child){
              child.replaceWith(t.identifier(id.name));
            }
          });
        }
    }
}
let arrowFunctionPlugin3 = {
    visitor: {
        //babel在遍历到ArrowFunctionExpression类型的节点的时候,会把相当的路径传过来
        ArrowFunctionExpression: (path) => {
            let node = path.node;//当前路径上的节点
            hoistFunctionEnvironment(path);
            node.type = 'FunctionExpression';
        }
    }
}

function hoistFunctionEnvironment(fnPath) {
    const { thisPaths } = getScopeInformation(fnPath);
    let thisBinding;

    if (thisPaths.length > 0) {
        thisEnvFn.scope.push({
            id: id,
            init: t.thisExpression()
        });
    }
    return thisBinding;
}
function getScopeInformation(fnPath) {
    const thisPaths = [];
    fnPath.traverse({
        ThisExpression(child) {
            thisPaths.push(child);
        }
    });
    return {thisPaths};
}

//babel本身只身只一个引擎,并不能转换源代码,插件能
let result = babel.transform(code, {
    plugins: [arrowFunctionPlugin2]
});
console.log(result.code);
/**
var _this = this;

const sum = function (a, b) {
  console.log(_this);
  return a + b;
};
 */