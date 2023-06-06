/**
webpack的编译过程中
entries 入口
module 模块
chunks 代码块 
assets 文件
*/
//let {SyncHook}  = require('tapable');
class SyncHook{
    constructor(){
        this.taps = [];
    }
    tap(name,callback){
        this.taps.push(callback);
    }
    call(...args){
        this.taps.forEach(tap=>tap(...args));
    }
}
let fs = require('fs');
let path = require('path');
class Compiler{
    constructor(config){
        this.config = config;
        this.hooks = {
            emit:new SyncHook(["assets"])
        }
    }
    run(){//开始编译了
     let entries= [];//放着所有的入口 默认情况下一个入口会对应一个代码块chunk
     let modules = [];//放着所有的模块
     let chunks = [];//所有的代码块
     let assets = {};//key是文件名,值是文件内容
     let files = [];//元素都是文件名文件名 files = Object.keys(assets);
     //5.确定入口：根据配置中的entry找出所有的入口文件
     let entry = path.join(this.config.context,this.config.entry);//main
     entries.push({name:'main',entry});
     //编译模块：从入口文件出发，调用所有配置的Loader对模块进行转译
     //1.先读取此模块的内容
     let entryContent = fs.readFileSync(entry,'utf8');
     let entrySource = babelLoader(entryContent);
     let entryModule = {id:'./src/index.js',source:entrySource,name:'main'};
     modules.push(entryModule);
     //先把entryModule编译成抽象语法树,然后找到里面的依赖 require import 来找依赖
     //递归的编译所有的所有的模块
     let cssPath = path.join(this.config.context,'./src/index.css');   
     let cssContent = fs.readFileSync(cssPath,'utf8');
     let cssSource = cssLoader(cssContent);
     let cssModule = {id:'./src/index.css',source:cssSource,name:'main'};
     modules.push(cssModule);
     //6.输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
     let chunk = {id:'main',modules:[entryModule,cssModule]};
     chunks.push(chunk);
     //7.再把每个Chunk转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
     for(let chunk of chunks){
        assets[chunk.id+'.js']=`(function (modules) {
            return __webpack_require__("./src/index.js");
          })
            ({
              "./src/index.js":
                (function (module, exports) {
                  console.log('index');
                })
            });`
     }   
     //在此触发emit钩子执行
     this.hooks.emit.call(assets);
     files= Object.keys(assets);//写入硬盘的文件名的数组
     //在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
     for(let file in assets){
         let filePath = path.join(this.config.output.path,file);
         fs.writeFileSync(filePath,assets[file]);
     }
    }
}
function babelLoader(source){
    return `let sum = function(a,b){return a+b}
    require('./index.css');
    `;
}
function cssLoader(source){
    return `
        let style = document.createElement('style');
        style.innerHTML = "body{background-color: red;}";
        document.head.appendChild(style);
    `;
}
//1.初始化参数：从配置文件和Shell语句中读取与合并参数，得出最终的参数；

let config = require('./webpack.config');
//2.开始编译：用上一步得到的参数初始化Compiler对象
let compiler = new Compiler(config);
//3.加载所有配置的插件
for(let plugin of config.plugins){
    plugin.apply(compiler);
}
//4.执行compiler对象的run方法开始执行编译
compiler.run();

