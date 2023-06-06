/**
 * 把CSS广西
 * @param {*} source 
 */
let loaderUtils = require('loader-utils');
function loader(source){

}
loader.pitch = function(remainingRequest,previousRequest,data){
  //console.log(remainingRequest);
  //stringifyRequest 把绝对路径转成相对路径 ./src/less-loader2!./src/index.less
  console.log(loaderUtils.stringifyRequest(this,"!!"+remainingRequest));
  let script = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this,"!!"+remainingRequest)});
    document.head.appendChild(style);
  `;
  return script;//给谁了?给webpack了,webpack会把这个脚本转成一个抽像语法对
  //然后分析里面的依赖 require import,找到一require方法的调用
  //继续解析!!./src/loaders/less-loader2.js!./src/index.less
  //

}
//绝对路径为什么要转成相对用?
module.exports = loader;