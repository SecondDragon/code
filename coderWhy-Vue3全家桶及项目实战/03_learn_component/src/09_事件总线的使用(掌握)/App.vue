<template>
  <div class="app">
    <h2>App Message: {{ message }}</h2>
    <home></home>
    <button @click="isShowCategory = false">是否显示category</button>
    <category v-if="isShowCategory"></category>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'
  import Home from './Home.vue'
  import Category from './Category.vue'

  export default {
    components: {
      Home,
      Category
    },
    data() {
      return {
        message: "Hello App",
        isShowCategory: true
      }
    },
    created() {
      // fetch()

      // 事件监听
      eventBus.on("whyEvent", (name, age, height) => {
        console.log("whyEvent事件在app中监听", name, age, height)
        this.message = `name:${name}, age:${age}, height:${height}`
      })
    }
  }
</script>

<style scoped>
</style>

