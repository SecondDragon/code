import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {// vue的构造函数
  this._init(options) // 默认调用init方法
}
// 扩展原型的
initMixin(Vue) //  Vue.prototype._init 
stateMixin(Vue) // vm.$set vm.$delete $watch 
eventsMixin(Vue) // vm.$on $emit $once  发布订阅的 组件的通信
lifecycleMixin(Vue) // Vue.prototype._update Vue.prototype.$destroy  Vue.prototype.$forceUpdate 
renderMixin(Vue) //   Vue.prototype._render  $nextTick




export default Vue
