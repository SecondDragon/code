/* @flow */

import { emptyNode } from 'core/vdom/patch'
import { resolveAsset, handleError } from 'core/util/index'
import { mergeVNodeHook } from 'core/vdom/helpers/index'

export default { // 指令的钩子, 在创建和更新过程中会调用 create、update、destroy钩子
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode: VNodeWithData) {
    updateDirectives(vnode, emptyNode)
  }
}

function updateDirectives (oldVnode: VNodeWithData, vnode: VNodeWithData) { 
  if (oldVnode.data.directives || vnode.data.directives) { // 如果有指令， 创建 || 更新
    _update(oldVnode, vnode) // 刚刚创建一个元素 这个元素没有被插入到dom中
  }
}

function _update (oldVnode, vnode) {
  const isCreate = oldVnode === emptyNode
  const isDestroy = vnode === emptyNode
  const oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context) // 获取指令的名字
  const newDirs = normalizeDirectives(vnode.data.directives, vnode.context) // 解析出最新的指令

  const dirsWithInsert = []
  const dirsWithPostpatch = []

  let key, oldDir, dir // 获取对应指令 ， 调用对应指令的钩子方法
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    if (!oldDir) { // 没有旧的说明是绑定
      // new directive, bind  
      callHook(dir, 'bind', vnode, oldVnode) // 调用bind说明 指令绑定上了 想操作输入框获取焦点还不行
      if (dir.def && dir.def.inserted) { // 用户写了inserted 会将这个对应函数存起来
        dirsWithInsert.push(dir)
      }
    } else {
      // existing directive, update  存在指令则是更新操作
      dir.oldValue = oldDir.value
      dir.oldArg = oldDir.arg
      callHook(dir, 'update', vnode, oldVnode)
      if (dir.def && dir.def.componentUpdated) {//如果有更新方法，推到队列中
        dirsWithPostpatch.push(dir)
      }
    }
  }

  if (dirsWithInsert.length) { // 如果有insert钩子，生成回调方法
    const callInsert = () => { // 留着 等会插入页面后调用
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], 'inserted', vnode, oldVnode) // 调用insrted钩子 ， 走到用户的inserted方法
      }
    }
    if (isCreate) { // mergeCallInsert 到insert钩子中
      mergeVNodeHook(vnode, 'insert', callInsert) // 两个函数的合并
    } else {
      callInsert()
    }
  }

  if (dirsWithPostpatch.length) { // 同理
    mergeVNodeHook(vnode, 'postpatch', () => {
      for (let i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode)
      }
    })
  }

  if (!isCreate) { // 销毁逻辑
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy)
      }
    }
  }
}

const emptyModifiers = Object.create(null)

function normalizeDirectives (
  dirs: ?Array<VNodeDirective>,
  vm: Component
): { [key: string]: VNodeDirective } {
  const res = Object.create(null)
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  let i, dir
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i]
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers
    }
    res[getRawDirName(dir)] = dir
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true)
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir: VNodeDirective): string {
  return dir.rawName || `${dir.name}.${Object.keys(dir.modifiers || {}).join('.')}`
}

function callHook (dir, hook, vnode, oldVnode, isDestroy) {
  const fn = dir.def && dir.def[hook]
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy)
    } catch (e) {
      handleError(e, vnode.context, `directive ${dir.name} ${hook} hook`)
    }
  }
}
