import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'
import { attributesModule } from 'snabbdom/build/package/modules/attributes'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

let patch = init([attributesModule, eventListenersModule])

const data = [1, 2, 3, 4]
let oldVnode = null

function view (data) {
  let arr = []
  data.forEach(item => {
    // 不设置 key
    // arr.push(h('li', [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
    // 设置key
    arr.push(h('li', { key: item }, [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
  })
  let vnode = h('div', [ h('button', { on: { click: function () {
    data.unshift(100)
    vnode = view(data)
    oldVnode = patch(oldVnode, vnode)
  } } }, '按钮') , h('ul', arr)])
  return vnode
}


let app = document.querySelector('#app')
// 首次渲染
oldVnode = patch(app, view(data))
