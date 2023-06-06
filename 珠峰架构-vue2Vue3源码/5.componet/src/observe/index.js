import { newArrayProto } from "./array";
import Dep from "./dep";

class Observer{
    constructor(data){

        // 给每个对象都增加收集功能 
        
        this.dep = new Dep(); // 所有对象都要增加dep


        // Object.defineProperty只能劫持已经存在的属性 （vue里面会为此单独写一些api  $set $delete）
        Object.defineProperty(data,'__ob__',{
            value:this,
            enumerable:false // 将__ob__ 变成不可枚举 （循环的时候无法获取到）
        });
        // data.__ob__ = this; // 给数据加了一个标识 如果数据上有__ob__ 则说明这个属性被观测过了
        if(Array.isArray(data)){
            // 这里我们可以重写数组中的方法 7个变异方法 是可以修改数组本身的
            data.__proto__ =  newArrayProto  // 需要保留数组原有的特性，并且可以重写部分方法
            this.observeArray(data); // 如果数组中放的是对象 可以监控到对象的变化
        }else{
            this.walk(data);
        }
    }

    walk(data){ // 循环对象 对属性依次劫持
        // "重新定义"属性   性能差
        Object.keys(data).forEach(key=> defineReactive(data,key,data[key]))
    }
    observeArray(data){ // 观测数组
        data.forEach(item=> observe(item))
    }
}
// 深层次嵌套会递归，递归多了性能差，不存在属性监控不到，存在的属性要重写方法  vue3-> proxy
function dependArray(value){
    for(let i = 0; i < value.length;i++){
        let current = value[i]
        current.__ob__ && current.__ob__.dep.depend();
        if(Array.isArray(current)){
            dependArray(current);
        }
    }
}

export function defineReactive(target,key,value){ // 闭包  属性劫持
    let childOb = observe(value); // 对所有的对象都进行属性劫持  childOb.dep 用来收集依赖的
    let dep = new Dep(); // 每一个属性都有一个dep
    Object.defineProperty(target,key,{
        get(){ // 取值的时候 会执行get
            if(Dep.target){
                dep.depend(); // 让这个属性的收集器记住当前的watcher
                if(childOb){
                    childOb.dep.depend(); // 让数组和对象本身也实现依赖收集
                    if(Array.isArray(value)){
                        dependArray(value);
                    }
                }
            }
            return value
        },
        set(newValue){ // 修改的时候 会执行set
            if(newValue === value) return
            observe(newValue)
            value = newValue
            dep.notify(); // 通知更新
        }
    })
}
export function observe(data){
    // 对这个对象进行劫持
    if(typeof data !== 'object' || data == null){
        return; // 只对对象进行劫持
    }
    if(data.__ob__ instanceof Observer){ // 说明这个对象被代理过了
        return data.__ob__;
    }
    // 如果一个对象被劫持过了，那就不需要再被劫持了 (要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过)

    return new Observer(data);

}
