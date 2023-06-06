const babylon = require('babylon');
const {Tapable} = require('tapable');
class Parser extends Tapable{
    parse(source){
        return babylon.parse(source,{
            sourceType:'module',//源代码是一个模块
            plugins:['dynamicImport']//额外一个插件,支持 import('./title.js');
        });
    }
    traverse(){
        
    }
}
module.exports = Parser;