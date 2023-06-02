import { popTarget, pushTarget } from "./dep";
import { queueWatcher } from "./scheduler";

let id = 0;
class Watcher {
    // vm,updateComponent,()=>{ console.log('更新视图了')},true
    constructor(vm,exprOrFn,cb,options){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb;
        this.options = options;
        this.id = id++;

        // 默认应该让exprOrFn执行  exprOrFn 方法做了什么是？ render （去vm上了取值）

        this.getter = exprOrFn; 
        this.deps = []; 
        this.depsId = new Set();

        this.get(); // 默认初始化 要取值
    }
    get(){ // 稍后用户更新 时 可以重新调用getter方法
        // defineProperty.get, 每个属性都可以收集自己的watcher
        // 我希望一个属性可以对应多个watcher，同时一个watcher可以对应多个属性
        pushTarget(this); // Dep.target = watcher
        this.getter(); // render() 方法会去vm上取值 vm._update(vm._render)
        popTarget(); // Dep.target = null; 如果Dep.target有值说明这个变量在模板中使用了
    }
    update(){ // vue中的更新操作是异步的
       // 每次更新时 this
       queueWatcher(this); // 多次调用update 我希望先将watcher缓存下来，等一会一起更新
    }
    run(){ // 后续要有其他功能
        this.get();
    }
    addDep(dep){
        let id = dep.id;
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this)
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
