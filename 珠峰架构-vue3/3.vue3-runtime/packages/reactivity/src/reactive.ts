import { isObject } from "@vue/shared"
import {
    mutableHandlers,
    shallowReactiveHandlers,
    readonlyHandlers,
    shallowReadonlyHandlers
} from './baseHandlers'
export function reactive(target){
    return createReactiveObject(target,false,mutableHandlers)
}
export function shallowReactive(target){
    return createReactiveObject(target,false,shallowReactiveHandlers)
}

export function readonly(target){
    return createReactiveObject(target,true,readonlyHandlers)
}

export function shallowReadonly(target){
    return createReactiveObject(target,true,shallowReadonlyHandlers)
}

// 是不是仅读 是不是深度， 柯里化  new Proxy() 最核心的需要拦截 数据的读取和数据的修改  get set
const reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄漏， 存储的key只能是对象
const readonlyMap = new WeakMap();
export function createReactiveObject(target,isReadonly,baseHandlers){
    // 如果目标不是对象 没法拦截了，reactive这个api只能拦截对象类型
    if( !isObject(target)){
        return target; 
    }
    // 如果某个对象已经被代理过了 就不要再次代理了  可能一个对象 被代理是深度 又被仅读代理了
    const proxyMap = isReadonly? readonlyMap:reactiveMap
    const existProxy = proxyMap.get(target);
    if(existProxy){
        return existProxy; // 如果已经被代理了 直接返回即可
    }
    const proxy = new Proxy(target,baseHandlers);
    proxyMap.set(target,proxy); // 将要代理的对象 和对应代理结果缓存起来

    return proxy;
}
