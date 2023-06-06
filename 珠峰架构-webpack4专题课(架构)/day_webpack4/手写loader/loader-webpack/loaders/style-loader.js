let loaderUtils = require('loader-utils');
function loader(source) {
  // 我们可以在style-loader中导出一个 脚本
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `
  return str;
}
// 在style-loader上 写了pitch
// style-loader     less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) { // 剩余的请求
  // 让style-loader 去处理less-loader!css-loader/./index.less 
  // require路径 返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
  let str = `
    let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
    document.head.appendChild(style);
  `
  return str;
}
module.exports = loader;


