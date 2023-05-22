<template>
  <div class="app">
    <home></home>
    <h2>App: {{ message }}</h2>
    <button @click="message = 'hello world'">修改message</button>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import Home from './Home.vue'

  export default {
    components: {
      Home
    },
    created() {

    },
    data() {
      return {
        message: "Hello App"
      }
    },
    // provide一般都是写成函数
    provide() {
      return {
        name: "why",
        age: 18,
        message: computed(() => this.message)
      }
    }
  }
</script>

<style scoped>
</style>

