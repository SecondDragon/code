/**
 * 此插件要做二件事
 * 1. 自动往产出的HTML里插入script标签,标签的src 指向库的CDN url地址
 * 2. 当引入lodash jquery模块的时候,自动转为外部模块 ,不再打包此模块到chunk.读window上的_和$变量
 * 3. 希望实现只引项目中使用到的模块才会引入CDN脚本,如果没用这个模块,即使你在配置external了,也不引入脚本
 * 思路 分析项目依赖,找到所有的依赖的模块跟配置的external的交集 
 */
const ExternalModule = require('webpack/lib/ExternalModule');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 class AutoExternalPlugin{
   constructor(options){
    this.options = options;
    this.usedExternalModules = new Set();
   }
   apply(compiler){
    let {options,usedExternalModules} = this;
    //webpack Module NormalModule普通模块 普通的JS模块
    //普通模块NormalModule是由NormalModuleFactory创建
    //要想创建NormalModule,需要先创建NormalModuleFactory,然后让工厂来建模块
    //现在要把普通模块变成一个外部模块
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin',(normalModuleFactory)=>{
      //简单理解 就是 分析require import 加载是否加载了。加载则插入，不加载则不插入
      normalModuleFactory.hooks.parser
      .for('javascript/auto')
      .tap('AutoExternalPlugin',(parser)=>{
        //statement =let $ = require('jquery'); source =jquery
        parser.hooks.import.tap('AutoExternalPlugin',(statement,source)=>{
          if(options[source]){
            usedExternalModules.add(source);//把source模块添加到SET中去,相同的模块只会加1次
          }
        });
        //表示方法调用
        parser.hooks.call.for('require').tap('AutoExternalPlugin',(expression)=>{
          let value = expression.arguments[0].value;
          if(options[value]){
            usedExternalModules.add(value);//把source模块添加到SET中去,相同的模块只会加1次
          }
        });
      });
      //拿到了普通模块工厂
      //每个模块工厂都有一个factory方法,是工厂生产模块的钩子
      //normalModuleFactory正常来说会要根据data创建模块 data就是要创建的模块信息
      //factory是原来原本的默认的创建模块的方法
      //factory老的工厂函数,返回的是一个新工厂函数
      normalModuleFactory.hooks.factory.tap('AutoExternalPlugin',(factory)=>(data,callback)=>{
        //data是一个对象,上面核心信息就是一个就是你要加载的模块 jquery lodash ./src/index.js
        //正常来说,你把data信息传给factory,它会创建对应的模 块并把模 块传给callback
        //改造此逻辑,不再统一生成普通模块
        let request = data.request;//要加载的模块的名字
        if(options[request]){//jquery lodash
          //创建一个外部模块并返回就可以了 $ window $  let $ = window.$;   
          //callback(null,new ExternalModule(variable,'window',request));
          newFactory(data,callback);
        }else{
          factory(data,callback);//走正常的生产模块的逻辑,生成普通模块
        }
        function newFactory(data,callback){
          let {request}= data;
          let externalModule = new ExternalModule(options[request],'window',request);
          callback(null,externalModule);
        }
      });
    });

    //自动向产出的html中插入script标签
    //通过监听compilation钩子可以实现在compiler在开启一次新的编译的时候,会把compilation传过来
    compiler.hooks.compilation.tap('AutoExternalPlugin',(compilation)=>{
        //HtmlWebpackPlugin可以向compilation增加额外的钩子,供其它插件来调用
        //compilation.hooks.htmlWebpackPluginAlterAssetTags
        //htmlPluginData
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin',(htmlPluginData,callback)=>{
          let scriptUrls =Object.keys(options).filter(key=>usedExternalModules.has(key)).map(key=>options[key].url);  
            scriptUrls.forEach(url=>{
                htmlPluginData.assetTags.scripts.unshift(      {
                    "tagName": "script",
                    "voidTag": false,
                    "attributes": {
                      "defer": false,
                      "src": url
                    }
                  });
            });
            //这是一个异步的串行瀑布钩子,所以要这个htmlPluginData传给下一次钩子函数
            callback(null,htmlPluginData);
        });
    });
   }

 }
 module.exports = AutoExternalPlugin;
/**
{
   //key是模块的名称 值是一个对象 expose 此CDN脚本向window挂的变量名 url此CDN的路径
   jquery:{
       expose:'$',
       url:'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
   },
   lodash:{
       expose:'_',
       url:'https://cdn.bootcdn.net/ajax/libs/lodash.js/0.1.0/lodash.js'
   }
}
 */