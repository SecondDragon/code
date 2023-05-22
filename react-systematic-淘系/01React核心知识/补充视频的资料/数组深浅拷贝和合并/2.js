/* 
  $.extend({ //把AA扩展到$的静态私有属性上
      AA(){}
  })
  $.fn.extend({ //把BB扩展到$的原型对象上
      BB(){}
  })
  $.extend(obj1,obj2,obj3,...) 实现多个对象的“浅”合并:obj2替换obj1,obj3替换obj1,.... 最后返回obj1
  $.extend(true,obj1,obj2,obj3,...) 实现多个对象的“深”合并
  ...
*/
jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {}, //target存储的是被替换的那一项
        i = 1,
        length = arguments.length,
        deep = false; //深浅合并 false浅 true真
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }
    if (typeof target !== "object" && !isFunction(target)) {
        target = {}; //被替换的那一项一定得是一个对象
    }
    if (i === length) { //匹配的是往$/$.fn上扩展方法
        target = this;
        i--;
    }

    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            // target 被替换项
            // options 替换项
            for (name in options) {
                copy = options[name];
                // copy 是替换项中的某一项

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                if (deep && copy && (jQuery.isPlainObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {
                    src = target[name];
                    // copy 替换项中的某一项值
                    // src 被替换项中的同名这一项的值

                    if (copyIsArray && !Array.isArray(src)) {
                        clone = [];
                    } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};