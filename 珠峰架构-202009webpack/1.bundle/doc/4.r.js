// define __esModule on exports
function __webpack_require__(){}
__webpack_require__.r = function (exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  //exports[Symbol.toStringTag]="Module";
  Object.defineProperty(exports, "__esModule", { value: true });
  //exports.__esModule=true;
};

let exp = {};
__webpack_require__.r(exp);
console.log(Object.prototype.toString.call(exp));//[object Module] 表示这是一个模块对象
console.log(exp.__esModule);// 如果exports身上有一个__esModule=true.就表示这个模 块打包前是一个es6模块
//出现了import 或者 export关键字的话,那么这个模 块就是一个es6模块
//webpack里面你不管什么模 块,都会变成common.js模块