/* @flow */

import { ENGINE_METHOD_DIGESTS } from 'constants'
import { remove, isDef } from 'shared/util'

export default {
  create (_: any, vnode: VNodeWithData) {
    registerRef(vnode)
  },
  update (oldVnode: VNodeWithData, vnode: VNodeWithData) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true)
      registerRef(vnode)
    }
  },
  destroy (vnode: VNodeWithData) {
    registerRef(vnode, true)
  }
}

export function registerRef (vnode: VNodeWithData, isRemoval: ?boolean) {
  const key = vnode.data.ref // 获取ref
  if (!isDef(key)) return

  const vm = vnode.context  // ref两个值 1个是放到组件 获取组件的实例 2.放到元素上会获取真实dom
  const ref = vnode.componentInstance || vnode.elm // 当前组件的实例 或者 组件的真实节点
  const refs = vm.$refs
  if (isRemoval) { // 删除ref
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref)
    } else if (refs[key] === ref) {
      refs[key] = undefined
    }
  } else {  
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {  // 在v-for中是数组 
        refs[key] = [ref]
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref)
      }
    } else {
      refs[key] = ref
    }
  }
}
