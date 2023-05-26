// 实现 new Proxy(target, handler)

import { extend, hasChanged, hasOwn, isArray, isIntegerKey, isObject } from "@vue/shared/src";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOrTypes } from "./operators";
import { reactive, readonly } from "./reactive";


const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const showllowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true);
export const mutableHandlers = {
    get,
    set
}
export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
}

let readonlyObj = {
    set: (target, key) => {
        console.warn(`set on key ${key} falied`)
    }
}
export const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlyObj)
export const shallowReadonlyHandlers = extend({
    get: showllowReadonlyGet,
}, readonlyObj)

// 是不是仅读的，仅读的属性set时会报异常
// 是不是深度的 
function createGetter(isReadonly = false, shallow = false) { // 拦截获取功能
    return function get(target, key, receiver) { // let proxy = reactive({obj:{}})
        // proxy + reflect
        // 后续Object上的方法 会被迁移到Reflect Reflect.getProptypeof()
        // 以前target[key] = value 方式设置值可能会失败 ， 并不会报异常 ，也没有返回值标识
        // Reflect 方法具备返回值
        // reflect 使用可以不使用 proxy es6语法

        const res = Reflect.get(target, key, receiver); // target[key];
        if(!isReadonly){
            // 收集依赖，等会数据变化后更新对应的视图
            track(target,TrackOpTypes.GET,key)
        }
        if(shallow){
            return res;
        }
        if(isObject(res)){ // vue2 是一上来就递归，vue3 是当取值时会进行代理 。 vue3的代理模式是懒代理
            return isReadonly ? readonly(res) : reactive(res)
        }
        return res;
    }
}
function createSetter(shallow = false) { // 蓝爵设置功能
    return function set(target, key, value, receiver) {

        const oldValue = target[key]; // 获取老的值

        let hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target,key);

        const result = Reflect.set(target, key, value, receiver); // target[key] = value


        if(!hadKey){
            // 新增 
            trigger(target,TriggerOrTypes.ADD,key,value);
        }else if(hasChanged(oldValue,value)){
            // 修改 
            trigger(target,TriggerOrTypes.SET,key,value,oldValue)
        }



        // 我们要区分是新增的 还是修改的  vue2 里无法监控更改索引，无法监控数组的长度变化  -》 hack的方法 需要特殊处理


        // 当数据更新时 通知对应属性的effect重新执行


        return result;
    }
}

