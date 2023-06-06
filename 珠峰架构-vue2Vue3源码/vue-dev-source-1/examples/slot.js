const templateCompiler = require('vue-template-compiler')
let result = templateCompiler.compile(`<my>
    <div>{{msg}}</div>  
</my>`);

console.log(result)


let result2 = templateCompiler.compile(`
<div class="my"><slot></slot><slot></slot></div>`) // _c('div',{staticClass:"my"},[_t("default")],2)
console.log(result2)
// _c('my',[_c('div',[_v(_s(msg))])])  // 此代码会立刻执行


// 组件的孩子叫插槽，元素的孩子就是孩子
// new Vnode = {'tag':'my',componentOptions :{children:  {tag:'div','hello'}}}


// 创建组件的真实节点
// this.$slots = {default:[儿子虚拟节点]}


// 组件渲染真实节点的时候 会采用组件的模板  _t("default")  在子组件渲染的时候 会通过_t 找到刚才的映射关系来进行替换


// 这个函数不是立即执行的
// {scopedSlots:_u([{key:"default",fn:function({msg}){return _c('div',{},[_v(_s(msg))])}}

let result3 = templateCompiler.compile(`<my>
<div slot-scope="{msg}">{{msg}}</div>
</my>`);
console.log(result3.render)

// 还是找到对应的关系来替换，这时候需要传入渲染的数据
let result4 = templateCompiler.compile(`<div class="my"><slot :msg="msg"></slot></div>`)
console.log(result4.render)