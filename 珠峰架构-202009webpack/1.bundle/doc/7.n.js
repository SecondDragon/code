
// getDefaultExport function for compatibility with non-harmony modules
// 获取默认导出为了兼容非es module common.js 同时兼容es module 和common.js,获取 他们的默认导出
//这个module可不是模块本身,而是一个导出对象
function __webpack_require__(){}
__webpack_require__.n = function (module) {
  var getter =
    module && module.__esModule
      ? function getDefault() {
          return module["default"];//如果这是一个es模块,那么它的默认导出会挂在导出对象的default属性上
        }
      : function getModuleExports() {//如果是一个common.js模块,直接取导出对象
          return module;
        };
  //给getter函数定义一个a的属性,属性的getter方法也就是获取 值的方法就是getter本身      
  //__webpack_require__.d(getter, "a", getter);
  Object.defineProperty(getter,'a',{get:getter});
  return getter;
};
let mod = { name: "zhufeng", __esModule:true,default:{age:10}};
let getter = __webpack_require__.n(mod);
console.log(getter.a);