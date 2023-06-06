/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {

  // 谁调用的this就是谁
  Vue.mixin = function (mixin: Object) { // this =Vue
    // 最终会将 mixin对象和Vue.options 合并在一起
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
