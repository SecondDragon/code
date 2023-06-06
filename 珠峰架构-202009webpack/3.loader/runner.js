/**
 * loader有哪些类型 pre normal inline post
 * 下节课内容预告
 * 1.讲一个叫pitch
 * 2.手写loader-runner
 * 3.写一些自己的loader url-loader file-loader less-loader sass-loader css-loader style-loader
 */
let path = require('path');
let fs = require('fs');
let {runLoaders} = require('./loader-runner');
let loadDir = path.resolve(__dirname,'loaders');
//要加载的资源和loader之间,loader和loader之间用!分隔,这是定死的
//let r = 'babel-loader?presets=@babel/preset/env';
let request = "inline-loader1!inline-loader2!./src/index.js";
let inlineLoaders = request
.replace(/^-?!+/,"")
.replace(/!!+/g,'!')
.split('!');//[inline-loader1,inline-loader2,./index.js]
let resource = inlineLoaders.pop();//获取 要加载的资源的路径  resource = ./index.js
console.log('resource',resource);
//定义一个函数,参数是loader的名字 返回值是loader的绝对路径
let resolveLoader = (loader)=>path.resolve(loadDir,loader);
//console.log(' resolveLoader之前inlineLoaders',inlineLoaders);
inlineLoaders = inlineLoaders.map(resolveLoader);//[inline-loader1绝对路径,inline-loader2绝对路径]
//console.log('resolveLoader之后inlineLoaders',inlineLoaders);
let rules = [
    {
        test:/\.js$/,
        use:["normal-loader1","normal-loader2"]
    },
    
    {
        enforce:'post',
        test:/\.js$/,
        use:[
        "post-loader1",
        "post-loader2"]
    },
    {
      enforce:'pre',
      test:/\.js$/,
      use:["pre-loader1"]
    },
    {
      enforce:'pre',
      test:/\.js$/,
      use:["pre-loader2"]
    },
]
let preLoaders = [];
let postLoaders = [];
let normalLoaders = [];
for(let i=0;i<rules.length;i++){
    let rule = rules[i];
    //如果这个规则的正则匹配要加载的资源的路径的话
    if(rule.test.test(resource)){ // /\.js$/.test("./src/index.js");
      if(rule.enforce=='pre'){
        preLoaders.push(...rule.use);
      }else if(rule.enforce=='post'){
        postLoaders.push(...rule.use);
      }else{
        normalLoaders.push(...rule.use);
      }
    }
}
preLoaders = preLoaders.map(resolveLoader);
postLoaders = postLoaders.map(resolveLoader);
normalLoaders = normalLoaders.map(resolveLoader);
//1.不管在rules数组中是如何排列的,永远是 post+inline+normal+pre
//2.如果类型一样的 先下后上,先右后左
let loaders = [];
//noPrePostAutoLoaders	不要前后置和普通 loader,只要内联 loader
if(request.startsWith('!!')){
  loaders=inlineLoaders;
  //noPreAutoLoaders	不要前置和普通 loader
}else if(request.startsWith('-!')){
  loaders = [...postLoaders,...inlineLoaders];
//noAutoLoaders	不要普通 loader  
}else if(request.startsWith('!')){
  loaders = [...postLoaders,...inlineLoaders,...preLoaders];
}else{
  loaders = [...postLoaders,...inlineLoaders,...normalLoaders,...preLoaders];
}
let cacheMap ={};
runLoaders({
    resource:path.join(__dirname,resource),//加载的资源的绝对路径
    loaders,//loaders的数组,也是绝对路径数组
    readResource:fs.readFile.bind(fs) //fs.readFile是一个读文件方法
},(err,data)=>{
    console.log(err);
    console.log(data);
/*     if(data.cacheable){
      cacheMap[path.join(__dirname,resource)]=data.result;
    } */
});

/**
{
  result: [
    "console.log('123');//pre-loader2//pre-loader1//normal-loader2//normal-loader1//inline-loader2//inline-loader1//pre-loader2//pre-loader1"
  ],
  resourceBuffer: <Buffer 63 6f 6e 73 6f 6c 65 2e 6c 6f 67 28 27 31 32 33 27 29 3b>,
  cacheable: true,
  fileDependencies: [ 'C:\\aproject\\zhufeng202009webpack\\3.loader\\src\\index.js' ],
  contextDependencies: []
}
 */