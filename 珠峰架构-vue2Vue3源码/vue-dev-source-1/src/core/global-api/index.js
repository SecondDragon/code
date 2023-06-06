/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef) // 配置信息

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = { // Vue中的工具方法
    warn,
    extend, // 合并
    mergeOptions, // 合并策略
    defineReactive // 定义响应式
  }

  Vue.set = set // set 
  Vue.delete = del // delete
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => { // 让一个对象变成了响应式的
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)

  // Vue.options.components = {}
  // Vue.options.directivexs = {}
  // Vue.options.filter = {}
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue // _base 指定的永远是Vue的构造函数

  extend(Vue.options.components, builtInComponents) //keep-alive的实现

  initUse(Vue) // Vue.use
  initMixin(Vue) // Vue.mixin
  initExtend(Vue) // Vue.extend
  initAssetRegisters(Vue) // 实现 Vue.component Vue.directive Vue.filter
}
