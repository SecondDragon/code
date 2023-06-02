import { forEach } from '../util'
class Module {
    constructor(rawModule) {
        this._raw = rawModule;
        this._children = {};
        this.state = rawModule.state

        // {
        //     _raw:rootModule,
        //     _children:{},
        //     state:rootModule.state
        // }
    }
    getChild(childName) {
        return this._children[childName]
    }
    addChild(childName, module) {
        this._children[childName] = module
    }
    forEachGetter(cb) {
        this._raw.getters && forEach(this._raw.getters, cb)
    }
    forEachMutation(cb) {
        this._raw.mutations && forEach(this._raw.mutations, cb)
    }
    forEachAction(cb) {
        this._raw.actions && forEach(this._raw.actions, cb)
    }
    forEachChildren(cb) {
        this._children && forEach(this._children, cb)
    }

    // 用于标识他自己是否写了namesapced
    get namespaced(){ // module.namespaced
        return !!this._raw.namespaced
    }
}


export default Module