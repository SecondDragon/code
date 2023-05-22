<template>
  <h2>message: {{message}}-{{counter}}</h2>
  <button @click="message = 'Hello World'">修改message</button>
  <button @click="counter++">+1</button>

  <div>
    <button @click="isShowHome = !isShowHome">显示Home</button>
    <home v-if="isShowHome"></home>
  </div>
</template>

<script>
  import Home from "./Home.vue"

  export default {
    components: {
      Home
    },
    data() {
      return {
        message: "Hello App",
        counter: 0,
        isShowHome: true
      }
    },
    // 1.组件被创建之前
    beforeCreate() {
      console.log("beforeCreate")
    },
    // 2.组件被创建完成
    created() {
      console.log("created")
      console.log("1.发送网络请求, 请求数据")
      console.log("2.监听eventbus事件")
      console.log("3.监听watch数据")
    },
    // 3.组件template准备被挂载
    beforeMount() {
      console.log("beforeMount")
    },
    // 4.组件template被挂载: 虚拟DOM -> 真实DOM
    mounted() {
      console.log("mounted")
      console.log("1.获取DOM")
      console.log("2.使用DOM")
    },
    // 5.数据发生改变
    // 5.1. 准备更新DOM
    beforeUpdate() {
      console.log("beforeUpdate")
    },
    // 5.2. 更新DOM
    updated() {
      console.log("updated")
    },

    // 6.卸载VNode -> DOM元素
    // 6.1.卸载之前
    beforeUnmount() {
      console.log("beforeUnmount")
    },
    // 6.2.DOM元素被卸载完成
    unmounted() {
      console.log("unmounted")
    }
  }
</script>

<style scoped>
</style>

