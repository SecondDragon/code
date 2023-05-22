(function () {
    let class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        utils = {};

    // 数据类型检测
    ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt"].forEach(
        name => {
            class2type[`[object ${name}]`] = name.toLowerCase();
        }
    );
    const toType = function toType(obj) {
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };
    utils.toType = toType;

    // 检测是否为函数/window
    const isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };
    const isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };
    utils.isFunction = isFunction;
    utils.isWindow = isWindow;

    // 检测是否为数据或者类数组
    const isArrayLike = function isArrayLike(obj) {
        let length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    utils.isArrayLike = isArrayLike;

    // 遍历数组/类数组/对象
    const each = function each(obj, callback) {
        callback = callback || Function.prototype;
        if (isArrayLike(obj)) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    result = callback.call(item, item, i);
                if (result === false) break;
            }
            return obj;
        }
        for (let key in obj) {
            if (!hasOwn.call(obj, key)) break;
            let item = obj[key],
                result = callback.call(item, item, key);
            if (result === false) break;
        }
        return obj;
    };
    utils.each = each;

    // 暴露API：支持浏览器导入和CommonJS/ES6Module规范
    if (typeof window !== "undefined") {
        window._ = window.utils = utils;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = utils;
    }
})();