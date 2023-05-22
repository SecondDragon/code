/* 
 * 两个对合并的意义:
 *   + 插件组件封装：参数处理
 *   + 业务需求
 *   + ...
 */

const options = {
    url: '',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    data: null,
    arr: [10, 20, 30],
    config: {
        xhr: {
            async: true,
            cache: false
        }
    }
};

const params = {
    url: 'http://www.zhufengpeixun.cn/api/',
    headers: {
        'X-Token': 'EF00F987DCFA6D31'
    },
    data: {
        lx: 1,
        from: 'weixin'
    },
    arr: [30, 40],
    config: {
        xhr: {
            cache: true
        }
    }
};

// 基于浅比较实现的对象的合并
// let xx = Object.assign(options, params);

/* 
 * 几种情况的分析
 *   A->options中的key值  B->params中的key值
 *   1.A&B都是原始值类型:B替换A即可
 *   2.A是对象&B是原始值:抛出异常信息
 *   3.A是原始值&B是对象:B替换A即可
 *   4.A&B都是对象:依次遍历B中的每一项,替换A中的内容
 */
// params替换options
function isObj(value) {
    // 是否为普通对象
    return _.toType(value) === "object";
}

function merge(options, params = {}) {
    _.each(params, (_, key) => {
        let isA = isObj(options[key]),
            isB = isObj(params[key]);
        if (isA && !isB) throw new TypeError(`${key} in params must be object`);
        if (isA && isB) {
            options[key] = merge(options[key], params[key]);
            return;
        }
        options[key] = params[key];
    });
    return options;
}

console.log(merge(options, params));