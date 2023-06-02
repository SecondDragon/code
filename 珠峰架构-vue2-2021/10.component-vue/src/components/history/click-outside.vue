<template>
  <div v-if="flag">
    <div class="box" v-click-outside="hide" ref="box">
      <input type="text" @focus="show" />
      <div v-show="isShow">面板</div>
    </div>
  </div>
  <div v-else></div>
</template>
<script>
// 指令特点可以复用  v-show  ， 核心就是控制dom，给dom元素绑定事件
// 自定义指令核心就是操作dom   
// 图片懒加载 、 虚拟滚动

// vue简单 react 容易
export default {
  name: "clickOutSide",
  directives: {
    clickOutside: {
      // bind + update
      bind(el, bindings, vnode) { // bindings 修饰符 和 值
        const handler = (e) => {
          if (!el.contains(e.target)) {
            // 点击的是外边
            let fn = vnode.context[bindings.expression]; // hide
            fn();
          }
        };
        el.handler = handler;
        // 只要点击的不是box中的内容就隐藏掉
        document.addEventListener("click", handler);
      },
      unbind(el) {
        console.log("remove");
        document.removeEventListener("click", el.handler);
      },
    },
  },
  data() {
    // 合并时
    return { isShow: false,flag:true };
  },
  mounted() {
      setTimeout(() => {
            this.flag = false
      }, 1000);
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style>
.box {
  display: inline-flex;
  flex-direction: column;
  border: 1px solid red;
}
</style>

