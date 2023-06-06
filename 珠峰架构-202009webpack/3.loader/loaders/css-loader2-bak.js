let postcss = require('postcss');
let loaderUtils  = require('loader-utils');
let Tokenizer = require('css-selector-tokenizer');
/**
 * postcss是用来处理CSS的,也是基于CSS抽象语法树的
 */
function loader(cssString){
    const cssPlugin = (options)=>{
        return (cssRoot)=>{
            //遍历语法树,找到所有的import语句
            cssRoot.walkAtRules(/^import$/i,rule=>{
                rule.remove();//删除 这个import
                let imp = rule.params.slice(1,-1);
                //console.log('imp',imp);
                options.imports.push(imp);
            });
            cssRoot.walkDecls(decl=>{
                let values = Tokenizer.parseValues(decl.value);
                //console.log(JSON.stringify(values,null,2));
                values.nodes.forEach(function(value){
                    value.nodes.forEach(item=>{
                        if(item.type === 'url'){
                            ////为什么要转require?
                            //console.log('item.url',loaderUtils.stringifyRequest(this,item.url));
                            item.url = "`+require("+loaderUtils.stringifyRequest(this,item.url)+").default+`";
                            console.log('====item',item);
                        }
                    });
                });
                decl.value = Tokenizer.stringifyValues(values);
                //console.log('====decl',decl);
            });
        }
    }
    let callback = this.async();
    let options = {imports:[]};//["./global.css"]
    //源代码会经过流水线的一个个的插件 
    let pipeLine = postcss([cssPlugin(options)]);
    pipeLine.process(cssString).then(result=>{
        let importCSS = options.imports.map(url=>{
            return "`+require("+loaderUtils.stringifyRequest(this,"!!css-loader2!"+url)+")+`";
        }).join('\r\n');
        console.log('result.css',result.css);
        let output = "module.exports = `"+importCSS+"\n"+result.css+"`";
        output=output.replace(/\\"/g,'"');
        console.log('=====output',output);
        callback(null,output);
    });
}
module.exports = loader;