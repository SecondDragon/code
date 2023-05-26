import { isFunction } from "@vue/shared/src";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOrTypes } from "./operators";
// 作业：调试 collectionHandlers ref 的api 和 computed
class ComputedRefImpl{
    public _dirty = true; // 默认取值时不要用缓存
    public _value;
    public effect;
    constructor(getter,public setter){ // ts 中默认不会挂载到this上
        this.effect = effect(getter,{
            lazy:true, // 默认不执行
            scheduler:()=>{
                if(!this._dirty){
                    this._dirty = true;
                    trigger(this,TriggerOrTypes.SET,'value')
                }
            }
        })
    }
    get value(){ // 计算属性也要收集依赖
        if(this._dirty){
            this._value = this.effect(); // 会将用户的反回值返回
            this._dirty = false;
        }
        track(this,TrackOpTypes.GET,'value')
        return this._value;
    }
    set value(newValue){
        this.setter(newValue)
    }
}

// vue2 和 vue3 computed原理是不一样的
export function computed(getterOrOptions){
    let getter;
    let setter;


    if(isFunction(getterOrOptions)){
        getter = getterOrOptions;
        setter = () =>{
            console.warn('computed value must be readonly')
        }
    }else{
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }

    return new ComputedRefImpl(getter,setter)

}