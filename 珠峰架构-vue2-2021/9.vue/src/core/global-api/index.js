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
 
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = { // Vue内部的工具方法
    warn,
    extend,
    mergeOptions,  // 合并属性的
    defineReactive // 定义响应式的
  }

  Vue.set = set // 这个原理 Vue.set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj) // observe 监控对象
    return obj
  }


  // 用户定义的全局属性 方法  component,directive filter
  // Vue.mixin({data,hook}) 数据来源不清晰， 好处是能复用 （高阶组件,Vue.mixin）
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    // Vue.options.components
    // Vue.options.filters
    // Vue.ocptions.directives
    Vue.options[type + 's'] = Object.reate(null)
  })


  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  // keep-alive 是全局组件 Vue.component  Vue.options.component
  extend(Vue.options.components, builtInComponents) // keep-alive

  initUse(Vue) Vue.use(plugin,options)   plugin.install(Vue,options)
  initMixin(Vue) // Vue.mixin => mergeOtions
  initExtend(Vue) // Vue.extend
  initAssetRegisters(Vue) // Vue.component Vue.filter Vue.directive
}
