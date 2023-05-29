import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
let vnode = h('div#container.cls',{
  hook: {
    init (vnode) {
      console.log(vnode.elm)
    },
    create (emptyNode, vnode) {
      console.log(vnode.elm)
    }
  }
}, 'Hello World')
let app = document.querySelector('#app')
// 第一个参数：旧的 VNode，可以是 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
let oldVnode = patch(app, vnode)

vnode = h('div#container.xxx', 'Hello Snabbdom')
patch(oldVnode, vnode)