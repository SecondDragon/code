import { initGlobalAPI } from "./gloablAPI";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import { nextTick } from "./observe/watcher";

// 将所有的方法都耦合在一起
function Vue(options) { // options就是用户的选项
    this._init(options); // 默认就调用了init
}

Vue.prototype.$nextTick = nextTick
initMixin(Vue); // 扩展了init方法
initLifeCycle(Vue);

initGlobalAPI(Vue)











export default Vue