import { hasChanged, isArray, isObject } from "@vue/shared/src";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOrTypes } from "./operators";
import { reactive } from "./reactive";

export function ref(value) {
    // 将普通类型 变成一个对象 , 可以是对象 但是一般情况下是对象直接用reactive更合理
    return createRef(value)
}

// ref 和 reactive的区别 reactive内部采用proxy  ref中内部使用的是defineProperty


export function shallowRef(value) {
    return createRef(value, true)
}

// 后续 看vue的源码 基本上都是高阶函数 做了类似柯里化的功能

const convert = (val) => isObject(val) ? reactive(val) : val
// beta 版本 之前的版本ref 就是个对象 ，由于对象不方便扩展 改成了类
class RefImpl {
    public _value; //表示 声明了一个_value属性 但是没有赋值
    public __v_isRef = true; // 产生的实例会被添加 __v_isRef 表示是一个ref属性
    constructor(public rawValue, public shallow) { // 参数中前面增加修饰符 标识此属性放到了实例上
        this._value = shallow ? rawValue : convert(rawValue)// 如果是深度 需要把里面的都变成响应式的
    }
    // 类的属性访问器
    get value() { // 代理 取值取value 会帮我们代理到 _value上
        track(this, TrackOpTypes.GET, 'value');
        return this._value
    }
    set value(newValue) {
        if (hasChanged(newValue, this.rawValue)) { // 判断老值和新值是否有变化
            this.rawValue = newValue; // 新值会作为老值
            this._value = this.shallow ? newValue : convert(newValue);
            trigger(this, TriggerOrTypes.SET, 'value', newValue);
        }
    }
}
function createRef(rawValue, shallow = false) {
    return new RefImpl(rawValue, shallow)
}

class ObjectRefImpl {
    public __v_isRef = true;
    constructor(public target, public key) {}
    get value(){ // 代理  
        return this.target[this.key] // 如果原对象是响应式的就会依赖收集
    }
    set value(newValue){
        this.target[this.key] = newValue; // 如果原来对象是响应式的 那么就会触发更新
    }
}
// promisify
// promisifyAll


// 将某一个key对应的值 转化成ref
export function toRef(target, key) { // 可以把一个对象的值转化成 ref类型
    return new ObjectRefImpl(target, key)
}

export function toRefs(object){ // object 可能传递的是一个数组 或者对象
    const ret = isArray(object) ? new Array(object.length) :{}
    for(let key in object){
        ret[key] = toRef(object,key);
    }
    return ret;
}