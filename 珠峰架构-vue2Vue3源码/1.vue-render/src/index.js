import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";

// 将所有的方法都耦合在一起
function Vue(options){ // options就是用户的选项
    this._init(options); // 默认就调用了init
}

initMixin(Vue); // 扩展了init方法
initLifeCycle(Vue);


export default Vue