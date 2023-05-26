import { isArray, isIntegerKey } from "@vue/shared/src";
import { TriggerOrTypes } from "./operators";

export function effect(fn, options: any = {}) {
    // 我需要让这个effect变成响应的effect，可以做到数据变化重新执行 
    const effect = createReactiveEffect(fn, options);
    if (!options.lazy) { // 默认的effect会先执行
        effect(); // 响应式的effect默认会先执行一次
    }
    return effect;
}
let uid = 0;
let activeEffect; // 存储当前的effect
const effectStack = []
function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect() {
        if (!effectStack.includes(effect)) { // 保证effect没有加入到effectStack中
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return fn(); // 函数执行时会取值  会执行get方法
            } finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    }
    effect.id = uid++; // 制作一个effect标识 用于区分effect
    effect._isEffect = true; // 用于标识这个是响应式effect
    effect.raw = fn; // 保留effect对应的原函数
    effect.options = options; // 在effect上保存用户的属性
    return effect;
}
// 让，某个对象中的属性 收集当前他对应的effect函数
const targetMap = new WeakMap();
export function track(target, type, key) { // 可以拿到当前的effect
    //  activeEffect; // 当前正在运行的effect
    if (activeEffect === undefined) { // 此属性不用收集依赖，因为没在effect中使用
        return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}

// 找属性对应的effect 让其执行 （数组、对象）
export function trigger(target, type, key?, newValue?, oldValue?) {

    // 如果这个属性没有 收集过effect，那不需要做任何操作
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const effects = new Set(); // 这里对effect去重了
    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => effects.add(effect));
        }
    }
    // 我要将所有的 要执行的effect 全部存到一个新的集合中，最终一起执行

    // 1. 看修改的是不是数组的长度 因为改长度影响比较大
    if (key === 'length' && isArray(target)) {
        // 如果对应的长度 有依赖收集需要更新
        depsMap.forEach((dep, key) => {
            if (key === 'length' || key > newValue) { // 如果更改的长度 小于收集的索引，那么这个索引也需要触发effect重新执行
                add(dep)
            }
        })
    } else {
        // 可能是对象
        if (key !== undefined) { // 这里肯定是修改， 不能是新增
            add(depsMap.get(key)); // 如果是新增
        }
        // 如果修改数组中的 某一个索引 怎么办？
        switch (type) {  // 如果添加了一个索引就触发长度的更新
            case TriggerOrTypes.ADD:
                if (isArray(target) && isIntegerKey(key)) {
                    add(depsMap.get('length'));
                }
        }
    }
    effects.forEach((effect: any) => effect())
}
// weakMap {name:'zf',age:12}  (map) =>{name => set(effect),age => set(effect)}
// {name:'zf',age:12} => name => [effect effect]


// 函数调用是一个栈型结构
// effect(()=>{ // effect1   [effect1]
//     state.name -> effect1
//     effect(()=>{ // effect2
//         state.age -> effect2
//     })
//     state.address -> effect1
// })