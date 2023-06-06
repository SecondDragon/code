/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index' // 内核中定义的逻辑
import platformModules from 'web/runtime/modules/index' // 针对浏览器的

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)


// 创建patch方法 ， 并且传入节点操作和属性操作
export const patch: Function = createPatchFunction({ nodeOps, modules })
