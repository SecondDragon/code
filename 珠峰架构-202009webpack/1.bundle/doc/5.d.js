  // Object.prototype.hasOwnProperty.call
__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
};
//为ES6模块导出定义getter函数
// define getter function for harmony exports
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {//判断exports身上有没有name属性,如果没有的话
    //给exports对象上定义一个name属性
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
  }
};
