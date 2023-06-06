(function (modules) {
  // webpackBootstrap
  // install a JSONP callback for chunk loading
  //在代码块加载后安装一个JSON callback的回调
  function webpackJsonpCallback(data) {
    var chunkIds = data[0]; //['title']
    var moreModules = data[1]; //{'./src/title.js':function(){module.exports = "title"}}
    debugger;
    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i]; //title
      let installedChunkData = installedChunks[chunkId]; //[resolve,reject,promise]
      let resolve = installedChunkData[0]; //resolve
      resolves.push(resolve);
      installedChunks[chunkId] = 0; //到此表示这个title代码块已经加载成功了
    }
    for (moduleId in moreModules) {
      //{./src/title.js}
      modules[moduleId] = moreModules[moduleId];
      ("./src/title.js");
    }
    while (resolves.length) {
      resolves.shift()(); //执行所有的resolve方法,意味着它对应的promise都完成
    }
  }

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks 是个存放加载过的和加载中的代码块
  // undefined = chunk not loaded, undefine 表示未加载
  // Promise = chunk loading 此代码块正在加载中
  // 0 = chunk loaded 0表示已经回来了,加载成功
  var installedChunks = {
    main: 0,
  };

  // script path function
  function jsonpScriptSrc(chunkId) {
    // return __webpack_require__.p + "" + ({ "title": "title" }[chunkId] || chunkId) + ".js";
    return chunkId + ".js";
  }

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk.这个main.js文件只包含入口代码块
  // The chunk loading function for additional chunks//这个e方法是用来加载额外的代码块的 title.js
  __webpack_require__.e = function requireEnsure(chunkId) {
    //title
    //因为加载代码块是异步的,所以声明promises空组件
    var promises = [];
    // JSONP chunk loading for javascript
    //到installedChunks看看这个代码块的状态
    var installedChunkData = installedChunks[chunkId]; //title
    if (installedChunkData !== 0) {
      //undefined不等于0
      // 0 means "already installed".
      // a Promise means "currently loading".
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache 在代码块缓存中安装Promise
        var promise = new Promise(function (resolve, reject) {
          let arr = [resolve, reject];
          installedChunks[chunkId] = arr;
          installedChunkData = arr;
          //installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        installedChunkData[2] = promise;
        promises.push(promise);
        //promises.push((installedChunkData[2] = promise));

        // start chunk loading
        var script = document.createElement("script");
        var onScriptComplete;

        script.charset = "utf-8";
        script.timeout = 120;
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        script.src = jsonpScriptSrc(chunkId);

        // create error before stack unwound to get useful stacktrace later
        var error = new Error();
        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType =
                event && (event.type === "load" ? "missing" : event.type);
              var realSrc = event && event.target && event.target.src;
              error.message =
                "Loading chunk " +
                chunkId +
                " failed.\n(" +
                errorType +
                ": " +
                realSrc +
                ")";
              error.name = "ChunkLoadError";
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: "timeout", target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };

  // create a fake namespace object 创建一个命名空间对象
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  // mode 二进制数  [bit,bit,bit,bit] 0000 1111
  __webpack_require__.t = function (value, mode) {
    // 1111&0001
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, "default", { enumerable: true, value: value });
    if (mode & 2 && typeof value != "string")
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

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, "a", getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function (err) {
    console.error(err);
    throw err;
  };
  debugger;
  var jsonpArray = [];
  window["webpackJsonp"] = jsonpArray; //数组就会有push方法
  //相当于重写了数组push方法,等于webpackJsonpCallback
  jsonpArray.push = webpackJsonpCallback;
  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})
  ({
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        btn.addEventListener('click', () => {
          //把异步加载过来的模块已经合并到modules上去了,就可以本地加载了
          __webpack_require__.e("title").then(
            __webpack_require__.t.bind(null, "./src/title.js", 7))
            .then((result) => {
            console.log(result.default);
          });
        });
      })
  });
  //0111=7
  //1=1 说明value参数是模收ID
  //1=2 说明要把value上的属性都合并或者说拷贝到ns对象上
  //1=4 主明如果这个value已经是一个es module,可以直接返回