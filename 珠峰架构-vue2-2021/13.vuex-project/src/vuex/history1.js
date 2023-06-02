import { Vue } from './install'
import { forEach } from './util'
class Store { // new Vue.Store 缠身一个实例
    constructor(options) {
        // 以下这些变量都是用户传递的
        let { state, getters, mutations, actions, module, strict } = options;
        this.getters = {}; // 我再取getters属性的时候 把他代理到计算属性上
        const computed = {};
        forEach(getters, (fn, key) => {
            computed[key] = () => {
                return fn(this.state); // 为了保证参数是state
            }
            // 当我们去getters上取值 需要对computed取值
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key] // 具备了缓存的功能
            })
        });
        // ----------
        this.mutations = {};
        forEach(mutations, (fn, key) => {
            this.mutations[key] = (payload) => fn.call(this, this.state, payload);
        });

        // ------dispatch中派发的是动作，里面可以有异步逻辑，更改状态都要通过mutation，mutation是同步更改的-------
        this.actions = {}
        forEach(actions, (fn, key) => {
            this.actions[key] = (payload) => fn.call(this, this, payload);
        });
        // 这个状态在页面渲染时需要收集对应的渲染watcher，这样状态更新才会更新视图
        this._vm = new Vue({
            data: { // $符号开头的数据不会被挂载到实例上,但是会挂载到当前的_data上，减少了一次代理
                $$state: state // 状态在哪里取值，就会收集对应的依赖
            },
            computed
        });
        // 用户组件中使用的$store = this
    }
    // 类的属性访问器
    get state() { // this.$store.state => defineProperty中的get
        // 依赖于 vue的响应式原理
        return this._vm._data.$$state
    }
    dispatch = (type, payload) => { // 根据commit还是dispatch 找对应的存储结果
        this.actions[type](payload)
    }
    commit = (type, payload) => {
        this.mutations[type](payload)
    }
}
// state getters action mutation  （modules 分层)
export default Store;
