import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'


function Vue(options) {
  this._init(options)
}

initMixin(Vue) // Vue.prototype._init
stateMixin(Vue) //  Vue.prototype.$set   Vue.prototype.$delete   Vue.prototype.$watch
eventsMixin(Vue) //  Vue.prototype.$on  Vue.prototype.$once Vue.prototype.$off  Vue.prototype.$emit 
lifecycleMixin(Vue) // Vue.prototype._update  Vue.prototype.$forceUpdate   Vue.prototype.$destroy
renderMixin(Vue); //  Vue.prototype.$nextTick  Vue.prototype._render

export default Vue


// 里面的每一个具体怎么实现  
// 1) 你找我了核心的流程 你可以单独打开源码去看
// 2) 如果不知道流程 通过写一些测试用例 ， 写一些案例来自己调试


// 全局api有哪些怎样实现的