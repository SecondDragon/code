
import {mergeOptions} from './utils'





export function initGlobalAPI(Vue) {
    // 静态方法
   
    Vue.options = {}
    Vue.mixin = function (mixin) {
        // 我们期望将用户的选项和 全局的options进行合并 '
        this.options = mergeOptions(this.options, mixin);
        return this;
    }

}