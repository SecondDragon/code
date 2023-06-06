(function (modules) { // webpackBootstrap启动方法自执行函数
  // The module cache 模块的缓存
  var installedModules = {};

  // The require function 自己实现一个基于common.js的模块require方法
  function __webpack_require__(moduleId) {//参数是模块ID
    // Check if module is in cache 判断模块在缓存里有没有,如果有则直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;//返回module的exports对象
    }
    // Create a new module (and put it into the cache)创建一个新的模 块并且放到缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,//模块ID
      l: false,//loaded是否已经加载过了
      exports: {}//导出对象的默认值是一个空对象
    };

    // Execute the module function 执行模块方法
    //在函数里面this指向模块的导出对象
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块设置为已经加载过了
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }
  return __webpack_require__("./src/index.js");
})
  ({
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        let title = __webpack_require__("./src/title.js");
        console.log(title);
      }),
    "./src/title.js":
      (function (module, exports) {
        module.exports = 'title';
      })
  });