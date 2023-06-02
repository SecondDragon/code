/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  Vue.component('xxxx',{
    name:'xxxxx'
  })

  Vue.component   Vue.options.components
  Vue.directive   Vue.options.directives 
  Vue.fiter  Vue.options.filters  进行对用户的属性收集操作，并没有做初始化
  Vue.directive('xxx',function(){})
  ASSET_TYPES.forEach(type => {
    Vue[type] = function ( // Vue.component
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) { // Vue.options.components
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)  Vue.extend
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
