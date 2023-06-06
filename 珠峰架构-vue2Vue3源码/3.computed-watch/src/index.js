import { initGlobalAPI } from "./gloablAPI";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import Watcher, { nextTick } from "./observe/watcher";

// 将所有的方法都耦合在一起
function Vue(options) { // options就是用户的选项
    this._init(options); // 默认就调用了init
}

Vue.prototype.$nextTick = nextTick
initMixin(Vue); // 扩展了init方法
initLifeCycle(Vue);

initGlobalAPI(Vue)



// 最终调用的都是这个方法
Vue.prototype.$watch = function (exprOrFn, cb) {
    // firstname
    // ()=>vm.firstname

    // firstname的值变化了 直接执行cb函数即可
    new Watcher(this,exprOrFn,{user:true},cb)
}










export default Vue