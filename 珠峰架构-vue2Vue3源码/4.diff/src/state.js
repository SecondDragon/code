import Dep from "./observe/dep";
import { observe } from "./observe/index";
import Watcher, { nextTick } from './observe/watcher'

export function initState(vm) {
    const opts = vm.$options; // 获取所有的选项
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm);
    }
    if (opts.watch) {
        initWatch(vm);
    }
}
function initWatch(vm) {
    let watch = vm.$options.watch;
    for (let key in watch) {
        const handler = watch[key]; // 字符串 数组 函数
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatcher(vm, key, handler[i]);
            }
        } else {
            createWatcher(vm, key, handler);
        }

    }

}

function createWatcher(vm, key, handler) {
    // 字符串  函数
    if (typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(key, handler)
}


function proxy(vm, target, key) {
    Object.defineProperty(vm, key, { // vm.name
        get() {
            return vm[target][key]; // vm._data.name
        },
        set(newValue) {
            vm[target][key] = newValue
        }
    })
}
function initData(vm) {
    let data = vm.$options.data; // data可能是函数和对象
    data = typeof data === 'function' ? data.call(vm) : data; // data是用户返回的对象

    vm._data = data; // 我将返回的对象放到了_data上
    // 对数据进行劫持 vue2 里采用了一个api defineProperty
    observe(data)

    // 将vm._data 用vm来代理就可以了 
    for (let key in data) {
        proxy(vm, '_data', key);
    }
}

function initComputed(vm) {
    const computed = vm.$options.computed;
    const watchers = vm._computedWatchers = {}; // 将计算属性watcher保存到vm上
    for (let key in computed) {
        let userDef = computed[key];

        // 我们需要监控 计算属性中get的变化
        let fn = typeof userDef === 'function' ? userDef : userDef.get

        // 如果直接new Watcher 默认就会执行fn, 将属性和watcher对应起来 
        watchers[key] = new Watcher(vm, fn, { lazy: true })

        defineComputed(vm, key, userDef);
    }
}
function defineComputed(target, key, userDef) {
    // const getter = typeof userDef === 'function' ? userDef : userDef.get;
    const setter = userDef.set || (() => { })

    // 可以通过实例拿到对应的属性
    Object.defineProperty(target, key, {
        get: createComputedGetter(key),
        set: setter
    })
}


// 计算属性根本不会收集依赖 ，只会让自己的依赖属性去收集依赖
function createComputedGetter(key) {
    // 我们需要检测是否要执行这个getter
    return function () {
        const watcher = this._computedWatchers[key]; // 获取到对应属性的watcher
        if (watcher.dirty) {
            // 如果是脏的就去执行 用户传入的函数
            watcher.evaluate(); // 求值后 dirty变为了false ,下次就不求值了
        }
        if (Dep.target) { // 计算属性出栈后 还要渲染watcher， 我应该让计算属性watcher里面的属性 也去收集上一层watcher
            watcher.depend();
        }
        return watcher.value; // 最后返回的是watcher上的值
    }
}

export function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick;
    // 最终调用的都是这个方法
    Vue.prototype.$watch = function (exprOrFn, cb) {
        // firstname
        // ()=>vm.firstname

        // firstname的值变化了 直接执行cb函数即可
        new Watcher(this, exprOrFn, { user: true }, cb)
    }
}