
const fs = require('fs');
const path = require('path');
const cssTree = require('css-tree');
let cssFilePath = path.join(__dirname,'input.css');

let transformPxToRem = async function(cssFilePath){
    let cssString = fs.readFileSync(cssFilePath,'utf8');
    let cssAstTree = cssTree.parse(cssString);
    //遍历语法树的所有节点,并且对每个节点调用函数,并传入node
    cssTree.walk(cssAstTree,function(node){
        if(node.type === 'Dimension' && node.unit == 'px'){
            node.value = node.value/75;//10px
            node.unit = 'rem';
        }
    });
    let output = cssTree.generate(cssAstTree);
    fs.writeFileSync(path.join(__dirname,'output.css'),output,function(){
        console.log('最终写入的代码');
    });

}

transformPxToRem(cssFilePath);