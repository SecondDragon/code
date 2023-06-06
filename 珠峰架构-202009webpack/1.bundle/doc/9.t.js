let modules = {
  moduleA: (module, exports) => {
    exports.value = "moduleA";
  },
  moduleB: (module, exports) => {
    exports.__esModule = true;
    exports.default = { value: "moduleB" };
  },
};
function __webpack_require__(moduleId) {
  var module = {
    i: moduleId,
    exports: {}
  };
  modules[moduleId].call(
    module.exports,
    module,
    module.exports,
    __webpack_require__
  );
  return module.exports;
}
__webpack_require__.r = function (exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  //exports[Symbol.toStringTag]="Module";
  Object.defineProperty(exports, "__esModule", { value: true });
  //exports.__esModule=true;
};
__webpack_require__.o = function (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
};
//为ES6模块导出定义getter函数
// define getter function for harmony exports
__webpack_require__.d = function (exports, name, getter) {
  if (!__webpack_require__.o(exports, name)) {
    //判断exports身上有没有name属性,如果没有的话
    //给exports对象上定义一个name属性
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
  }
};
//ns namespace es6模块对象 导出值 会放在default属性上
// create a fake namespace object 创建一个命名空间对象
// mode & 1: value is a module id, require it value是一个模块ID,可以直接加载 
// mode & 2: merge all properties of value into the ns 合并所有value上的属性到 ns对象上
// mode & 4: return value when already ns object 如果value已经是一个ns对象可以直接返回
// mode & 8|1: behave like require //0b1001 和require方法效果是一样的
// mode 二进制数  [bit,bit,bit,bit] 0000 1111
__webpack_require__.t = function (value, mode) {
  // 1111&0001 与之后0000false 如果不为0就是true0b 0111
  if (mode & 0b0001) value = __webpack_require__(value); //1
  if (mode & 0b1000) return value; //8
  if (mode & 0b0100 && typeof value === "object" && value && value.__esModule)
    //4
    return value;
  var ns = Object.create(null);
  __webpack_require__.r(ns); //__esModule=true 不管原来是谁,都转成es6
  Object.defineProperty(ns, "default", { enumerable: true, value: value });
  if (mode & 0b0010 && typeof value != "string")
    //2
    for (var key in value)
      __webpack_require__.d(
        ns,
        key,
        function (key) {
          return value[key];
        }.bind(null, key)
      );
  return ns;
};

let result1 = __webpack_require__.t("moduleA", 0b0001);
console.log("result1",result1);

let result2 = __webpack_require__.t("moduleA", 0b1001);
console.log("result2", result2);
let result3 = __webpack_require__.t("moduleB", 0b0101);
console.log("result3", result3);
debugger;
let result4 = __webpack_require__.t("moduleA", 0b0011);
console.log("result4", result4);




console.log((1).toString(2).padStart(4,'0'));//0b0001
console.log((2).toString(2).padStart(4, "0"));//0b0010
console.log((4).toString(2).padStart(4, "0"));//0b0100
console.log((8).toString(2).padStart(4, "0"));//0b1000