import { mergeOptions } from "../utils";

export function initGlobalApi(Vue) {
    Vue.options = {}; // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并
    // Vue.component
    // Vue.filter
    // Vue.directive
    
    Vue.mixin = function(options) {
        this.options = mergeOptions(this.options, options); 
        return this;
    }


    Vue.options._base = Vue; // 无论后续创建多少个子类 都可以通过_base找到Vue
    Vue.options.components = {};
    Vue.component = function (id,definition){
        // 保证组件的隔离， 每个组件都会产生一个新的类，去继承父类
        definition = this.options._base.extend(definition);
        this.options.components[id] = definition;
        
    }

    // 给个对象返回类
    Vue.extend = function (opts) { // extend方法就是产生一个继承于Vue的类
        // 并且身上应该有父类的所有功能 
        const Super = this
        const Sub = function VueComponent(options){
            this._init(options);
        }
        // 原型继承
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options,opts);// 只和Vue.options合并
        return Sub;
    }
}