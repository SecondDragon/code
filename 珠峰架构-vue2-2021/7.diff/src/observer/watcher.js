import { debug } from "webpack";
import { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./scheduler";

let id = 0;
class Watcher {
    // vm,updateComponent,()=>{ console.log('更新视图了')},true
    constructor(vm, exprOrFn, cb, options) {

        // exporOfFn
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.user = !!options.user; // 是不是用户watcher
        this.lazy = !!options.lazy;
        this.dirty = options.lazy; // 如果是计算属性，那么默认值lazy:true, dirty:true
        this.cb = cb;
        this.options = options;
        this.id = id++;

        // 默认应该让exprOrFn执行  exprOrFn 方法做了什么是？ render （去vm上了取值）
        if (typeof exprOrFn == 'string') {
            this.getter = function() { // 需要将表达式转化成函数
                // 当我数据取值时 ， 会进行依赖收集
                // age.n  vm['age.n']  =》 vm['age']['n']
                let path = exprOrFn.split('.'); // [age,n]
                let obj = vm;
                for (let i = 0; i < path.length; i++) {
                    obj = obj[path[i]]
                }
                return obj; // getter方法
            }
        } else {
            this.getter = exprOrFn; // updateComponent
        }

        this.deps = [];
        this.depsId = new Set();
        // 第一次的value
        this.value = this.lazy ? undefined : this.get(); // 默认初始化 要取值

    }
    get() { // 稍后用户更新 时 可以重新调用getter方法
        // defineProperty.get, 每个属性都可以收集自己的watcher
        // 我希望一个属性可以对应多个watcher，同时一个watcher可以对应多个属性


        pushTarget(this); // Dep.target = watcher
        const value = this.getter.call(this.vm); // render() 方法会去vm上取值 vm._update(vm._render)
        popTarget(); // Dep.target = null; 如果Dep.target有值说明这个变量在模板中使用了

        return value
    }
    update() { // vue中的更新操作是异步的
        // 每次更新时 this

        if(this.lazy){
            this.dirty = true;
        }else{
            queueWatcher(this); // 多次调用update 我希望先将watcher缓存下来，等一会一起更新
        }
    }
    run() { // 后续要有其他功能
        let newValue = this.get();
        let oldValue = this.value
        this.value = newValue; // 为了保证下一次更新时 上一次的最新值是下一次的老值
        if (this.user) {
            this.cb.call(this.vm, newValue, oldValue);
        }
    }
    addDep(dep) {
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this)
        }
    }
    evaluate(){
        this.dirty = false; // 为false表示取过值了
        this.value = this.get(); // 用户的getter执行
    }
    depend(){
        let i = this.deps.length;
        while(i--){
            this.deps[i].depend(); //lastName,firstName 收集渲染watcher
        }
    }
}

// watcher 和 dep
// 我们将更新的功能封装了一个watcher
// 渲染页面前，会将当前watcher放到Dep类上
// 在vue中页面渲染时使用的属性，需要进行依赖收集 ，收集对象的渲染watcher
// 取值时，给每个属性都加了个dep属性，用于存储这个渲染watcher （同一个watcher会对应多个dep）
// 每个属性可能对应多个视图（多个视图肯定是多个watcher） 一个属性要对应多个watcher
// dep.depend() => 通知dep存放watcher => Dep.target.addDep() => 通知watcher存放dep
// 双向存储
export default Watcher