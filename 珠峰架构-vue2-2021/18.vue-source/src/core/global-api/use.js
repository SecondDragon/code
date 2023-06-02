/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) { // Vue.use(xxx,a,b,vc)
  Vue.use = function (plugin: Function | Object) {
    // 插件缓存
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) { // 如果已经有插件 直接返回
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // 除了第一项其他的参数整合成数组
    args.unshift(this) // 将Vue 放入到数组中 // [Vue,a,b,c]
    if (typeof plugin.install === 'function') { // 调用install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { // 直接调用方法
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin) // 缓存插件
    return this
  }
}
