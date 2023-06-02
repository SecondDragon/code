export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(val) {
    return typeof val == 'object' && val !== null

}
const callbacks = [];

function flushCallbacks() {
    callbacks.forEach(cb => cb());
    waiting = false
}
let waiting = false;

function timer(flushCallbacks) {
    let timerFn = () => {}
    if (Promise) {
        timerFn = () => {
            Promise.resolve().then(flushCallbacks)
        }
    } else if (MutationObserver) {
        let textNode = document.createTextNode(1);
        let observe = new MutationObserver(flushCallbacks);
        observe.observe(textNode, {
            characterData: true
        })
        timerFn = () => {
            textNode.textContent = 3;
        }
        // 微任务
    } else if (setImmediate) {
        timerFn = () => {
            setImmediate(flushCallbacks)
        }
    } else {
        timerFn = () => {
            setTimeout(flushCallbacks)
        }
    }
    timerFn();
}

// 微任务是在页面渲染前执行 我取的是内存中的dom，不关心你渲染完毕没有

export function nextTick(cb) {
    callbacks.push(cb); // flushSchedulerQueue / userCallback

    if (!waiting) {
        timer(flushCallbacks); // vue2 中考虑了兼容性问题 vue3 里面不在考虑兼容性问题
        waiting = true;
    }
}




let lifeCycleHooks = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]
let strats = {}; // 存放各种策略
//   {}     {beforeCreate:Fn} => {beforeCreate:[fn]}
//   {beforeCreate:[fn]}    {beforeCreate:fn}   => {beforeCreate:[fn,fn]}

function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal); // 后续
        } else {
            return [childVal]; // 第一次
        }
    } else {
        return parentVal
    }
}
lifeCycleHooks.forEach(hook => {
    strats[hook] = mergeHook
});

strats.components = function(parentVal, childVal) {
    // Vue.options.components
    let options = Object.create(parentVal); // 根据父对象构造一个新对象 options.__proto__= parentVal
    if (childVal) {
        for (let key in childVal) {
            options[key] = childVal[key];
        }
    }
    return options
}

export function mergeOptions(parent, child) {
    const options = {}; // 合并后的结果
    for (let key in parent) {
        mergeField(key);
    }
    for (let key in child) {
        if (parent.hasOwnProperty(key)) {
            continue;
        }
        mergeField(key);
    }

    function mergeField(key) {
        let parentVal = parent[key];
        let childVal = child[key];
        // 策略模式
        if (strats[key]) { // 如果有对应的策略就调用对应的策略即可
            options[key] = strats[key](parentVal, childVal)
        } else {
            if (isObject(parentVal) && isObject(childVal)) {
                options[key] = { ...parentVal, ...childVal }
            } else {
                // 父亲中有，儿子中没有
                options[key] = child[key] || parent[key];
            }
        }
    }
    return options
}



export function isReservedTag(str) {
    let reservedTag = 'a,div,span,p,img,button,ul,li';
    // 源码根据 “，” 生成映射表 {a:true,div:true,p:true}
    return reservedTag.includes(str);
}