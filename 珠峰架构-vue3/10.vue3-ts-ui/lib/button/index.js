import { defineComponent, openBlock, createBlock } from 'vue';

var script = defineComponent({
    name: 'ZButton'
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("button", null, "按钮"))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Button = script;

export default _Button;
