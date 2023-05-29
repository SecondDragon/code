import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

let vnode = h('div#container', [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是一个p')
])

let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

setTimeout(() => {
  // vnode = h('div#container', [
  //   h('h1', 'Hello World'),
  //   h('p', 'Hello P')
  // ])
  // patch(oldVnode, vnode)

  // 清除div中的内容
  patch(oldVnode, h('!'))
}, 2000);