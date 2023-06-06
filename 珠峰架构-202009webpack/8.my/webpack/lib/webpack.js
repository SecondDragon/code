const Compiler = require("./Compiler");
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");
const WebpackOptionsApply = require('./WebpackOptionsApply');
const webpack = (options) => {
   let compiler = new Compiler(options.context); //创建一个Compiler实例  
   compiler.options = options;//给它赋于一个options属性
   new NodeEnvironmentPlugin().apply(compiler);//让compiler可以读文件和写文件
   //挂载配置文件里提供的所有的plugins
   if(options.plugins && Array.isArray(options.plugins)){
      for(const plugin of options.plugins){
        plugin.apply(compiler);
      }
   }
   //初始化选项,挂载内置插件
   new WebpackOptionsApply().process(options,compiler);
   return compiler;
}


exports = module.exports = webpack;