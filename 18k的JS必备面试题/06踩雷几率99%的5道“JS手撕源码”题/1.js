// 浅克隆
function shallowClone(obj) {
    let type = _.toType(obj),
        Ctor = obj.constructor;

    // 对于Symbol/BigInt
    if (/^(symbol|bigint)$/i.test(type)) return Object(obj);

    // 对于正则/日期的处理
    if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);

    // 对于错误对象的处理 
    if (/^error$/i.test(type)) return new Ctor(obj.message);

    // 对于函数
    if (/^function$/i.test(type)) {
        // 返回新函数：新函数执行还是把原始函数执行，实现和原始函数相同的效果
        return function () {
            return obj.call(this, ...arguments);
        };
    }

    // 数组或者对象
    if (/^(object|array)$/i.test(type)) {
        let keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)],
            result = new Ctor();
        _.each(keys, key => {
            result[key] = obj[key];
        });
        return result;
        /* let result = new Ctor();
        _.each(obj, (_, key) => {
            result[key] = obj[key];
        });
        return result; */

        /* // Symbol属性
        return type === "array" ? [...obj] : {
            ...obj
        }; */
    }

    return obj;
}

// 深克隆：只要有下一级的，我们就克隆一下（浅克隆）
function deepClone(obj, cache = new Set()) {
    let type = _.toType(obj),
        Ctor = obj.constructor;
    if (!/^(object|array)$/i.test(type)) return shallowClone(obj);

    // 避免无限套娃
    if (cache.has(obj)) return obj;
    cache.add(obj);
    
    let keys = [
            ...Object.keys(obj),
            ...Object.getOwnPropertySymbols(obj)
        ],
        result = new Ctor();
    _.each(keys, key => {
        // 再次调用deepClone的时候把catch传递进去，保证每一次递归都是一个cache
        result[key] = deepClone(obj[key], cache);
    });
    return result;
}

let arr = [10, 20, [30, 40, [50, 60]], 70];

let obj = {
    0: 'math',
    1: 'chinese',
    2: 'elglish',
    score: {
        math: 98,
        chinese: 100,
        elglish: 19,
    },
    reg: /\d+/img,
    time: new Date,
    friends: ['tom', 'jerry'],
    say: function () {
        console.log('good good study!');
    },
    tag: Symbol('TAG'),
    [Symbol.toStringTag]: 'object'
};
obj.xxx = {
    0: obj
};

// 数组浅拷贝
// let newArr = [...arr];
// newArr = arr.concat([]);
// newArr = arr.slice();

// 对象的浅拷贝
/* 
let newObj = {
    ...obj
};
newObj = Object.assign({}, obj); 
// 处理的时候包含了原始对象中 Symbol属性 的处理
*/

// 自己用for in遍历的时候不支持对 Symbol属性 的处理
/* let newObj = {};
_.each(obj, (value, key) => {
    newObj[key] = value;
}); */

/* let newObj = {};
let keys = [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
];
_.each(keys, key => {
    newObj[key] = obj[key];
}); */