/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type VNodeCache = { [key: string]: ?VNode };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  abstract: true, // 不会放到对应的lifecycle

  props: {
    include: patternTypes, // 白名单
    exclude: patternTypes, // 黑名单
    max: [String, Number] // 缓存的最大个数
  },

  created () {
    this.cache = Object.create(null) // 缓存列表
    this.keys = []  // 缓存的key列表  , 缓存的是组件实例 el  vnode
  },

  destroyed () {
    for (const key in this.cache) { // keep-alive销毁时 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () { // 监控缓存列表
    this.$watch('include', val => {  // 缓存列表可以是动态的
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    const slot = this.$slots.default// 获取默认插槽
    const vnode: VNode = getFirstComponentChild(slot)// 获得第一个组件
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions // {Ctor,children,tag,name}
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if ( // 获取组件名 看是否需要缓存，不需要缓存则直接返回
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode // 不需要缓存直接返回虚拟节点即可
      }

      const { cache, keys } = this // 1 - tag
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key // 生成缓存的key
      if (cache[key]) { // 如果有key 将组件实例直接复用
        vnode.componentInstance = cache[key].componentInstance; // 复用了之前缓存中的组件实例
        // make current key freshest
        remove(keys, key)
        keys.push(key) // lru算法
      } else {
        cache[key] = vnode // 缓存组件
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode) // 超过最大限制删除第一个
        }
      }
      // 组件被keep-alive 为了防止组件在初始化的时候 重新init
      vnode.data.keepAlive = true // 在firstComponent的vnode中增加keep-alive属性
    }
    // 先渲染 当前对应的组件内容，  返回的是虚拟节点，之后会将节点初始化的时候，跳过渲染流程， 不在执行初始化流程了 activeted deactived 执行 拉取最新数据的功能
    return vnode || (slot && slot[0])// vnode.$el
  }

  // keep-alive    -> 插槽  ->  重新渲染  a  b   a 
}
