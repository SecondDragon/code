/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    debugger;
    this.options = mergeOptions(this.options, mixin) // 全局属性混合
    return this
  }
}
