import { defineComponent, openBlock, createBlock } from 'vue';

var script$1 = defineComponent({
    name: 'ZButton'
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", null, "按钮"))
}

script$1.render = render$1;
script$1.__file = "packages/button/src/button.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1); // 注册全局组件
};
const _Button = script$1;

var script = defineComponent({
    name:'ZIcon',
    props:{
        name:{
            type:String,
            default:''
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("i", {
    class: `z-icon-${_ctx.name}`
  }, null, 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/icon/src/icon.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Icon = script;

const components = [
    _Button,
    _Icon
];
console.log(_Icon);
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
// 在使用组件库的时候可以使用 createApp().use(XXX)
var index = {
    install
};
// 组件库看效果的网址 -》 文档  =》 md -> webpack

export default index;
