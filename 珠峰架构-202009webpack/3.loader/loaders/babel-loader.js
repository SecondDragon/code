
let babel = require('@babel/core');
//在loader执行的时候this会指向loaderContext对象,它上面有一个callback方法
function loader(source){
  let options={
    presets:["@babel/preset-env"],//配置预设,它是一个插件包,这里面插件
    sourceMap:true,//生成sourcemap文件 才可以调试真正的源码
    filename:this.resourcePath.split('/').pop()
  };
  //转换后的es5代码  新的source-map文件 ast抽象语法树
  let {code,map,ast} = babel.transform(source,options);
  //如果babel转换后提供了ast抽象语法树,那么webpack会直接 使用你这个loader提供 的语法树
  //而不再需要自己把code再转成语法树了
  //内置的
  //当这个loader 返回一个值的时候可以直接 return
  //如果想返回多个值 callback();
  return this.callback(null,code,map,ast);
}
module.exports = loader;