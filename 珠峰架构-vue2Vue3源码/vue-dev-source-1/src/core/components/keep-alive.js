/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type CacheEntry = {
  name: ?string;
  tag: ?string;
  componentInstance: Component;
};

type CacheEntryMap = { [key: string]: ?CacheEntry };

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
    const entry: ?CacheEntry = cache[key]
    if (entry) {
      const name: ?string = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: CacheEntryMap,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const entry: ?CacheEntry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}

const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
  name: 'keep-alive',// 组件名
  abstract: true, // 抽象组件 就是不会被记录到 $children 和 $parent上

  props: { 
    include: patternTypes, // 可以缓存哪些组件 ['a','b']
    exclude: patternTypes, // 可以排除哪些组件 ['a']
    max: [String, Number] // 最大缓存个数  6
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = { // 缓存中 防止需要缓存的组件 。 存放组件的实例
          name: getComponentName(componentOptions),
          tag,
          componentInstance, // 组件实例渲染过会有$el 属性，下次可以直接复用$el属性
        }
        keys.push(keyToCache) // 放入key 
        // prune oldest entry // 超过最大长度会移除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    this.cache = Object.create(null) // 弄了个缓存区 {}
    this.keys = [] // 缓存组件的名字有哪些 []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.cacheVNode() // 渲染完后 缓存虚拟节点
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },

  render () {
    const slot = this.$slots.default // 取的是默认插槽
    const vnode: VNode = getFirstComponentChild(slot) // 获取插槽中的第一个虚拟节点

    // { Ctor, propsData, listeners, tag, children }
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) { 
      // check pattern
      const name: ?string = getComponentName(componentOptions) // 获取组件名
      const { include, exclude } = this // 校验是否需要缓存
      if (  // 这些情况是不复用的情况
        // not included  不包含的
        (include && (!name || !matches(include, name))) ||
        // excluded // 排除的
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this   // {}  []
      // 生成一个唯一的key
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) { // 是否这个key缓存过 
        vnode.componentInstance = cache[key].componentInstance // 获取缓存的实例 
        // make current key freshest
        remove(keys, key) // 把当前的key 作为最新的
        keys.push(key)
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode // 缓存当前的vnode 
        this.keyToCache = key // 这个key也要缓存
      }

      vnode.data.keepAlive = true // 给虚拟节点增加了一个标识 data: keep-alive
    } 
    // vnode上有data.keepAlive  和 我们的 componentInstance 说明这个虚拟节点是缓存过的
    return vnode || (slot && slot[0]) // 最终返回vnode
  }
}
