import { Vue } from './install'
import ModuleCollection from './module/module-collection';
import { forEach } from './util';


function installModule(store, rootState, path, module) { //  a/b/c/d
    // 需要循环当前模块的

    // 获取moduleCollection类的实例
    let ns = store._modules.getNamespace(path);
    // module.state => 放到rootState对应的儿子里
    if (path.length > 0) { // 儿子模块 
        // 需要找到对应父模块，将状态声明上去
        // {name:'zf',age:'12',a:aState}
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current];
        }, rootState);
        // 对象新增属性不能导致重新更新视图
        Vue.set(parent, path[path.length - 1], module.state);
    }
    module.forEachGetter((fn, key) => {
        store.wrapperGetters[ns + key] = function() {
            return fn.call(store, module.state);
        }
    });
    module.forEachMutation((fn, key) => { // {myAge:[fn,fn]}
        store.mutations[ns + key] = store.mutations[ns + key] || [];
        store.mutations[ns + key].push((payload) => {
            return fn.call(store, module.state, payload)
        })
    });
    module.forEachAction((fn, key) => {
        store.actions[ns + key] = store.actions[ns + key] || [];
        store.actions[ns + key].push((payload) => {
            return fn.call(store, store, payload)
        })
    });
    module.forEachChildren((child, key) => {
        installModule(store, rootState, path.concat(key), child);
    });
}
class Store {
    constructor(options) {
        // 对用户的模块进行整合 
        // 当前格式化完毕的数据 放到了this._modules里
        this._modules = new ModuleCollection(options); // 对用户的参数进行格式化操作
        this.wrapperGetters = {}
        this.getters = {}; // 我需要将模块中的所有的getters，mutations,actions进行收集
        this.mutations = {};
        this.actions = {};
        const computed = {};
        // 没有namespace的时候 getters都放在根上 ,actions,mutations 会被合并数组
        let state = options.state;
        installModule(this, state, [], this._modules.root);
        forEach(this.wrapperGetters,(getter,key)=>{
            computed[key] = getter;
            Object.defineProperty(this.getters,key,{
                get:()=>this._vm[key]
            })
        });
        this._vm = new Vue({
            data: {
                $$state: state
            },
            computed
        });
    
        console.log(this.getters,this.mutations,this.actions)
    }



    get state() {
        return this._vm._data.$$state
    }
    commit = (mutationName, payload) => { // 发布
        this.mutations[mutationName] && this.mutations[mutationName].forEach(fn => fn(payload))
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName] && this.actions[actionName].forEach(fn => fn(payload))
    }
}
// state getters action mutation  （modules 分层)
export default Store;