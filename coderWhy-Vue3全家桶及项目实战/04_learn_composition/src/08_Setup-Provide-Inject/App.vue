<template>
  <div>AppContent: {{ name }}</div>
  <button @click="name = 'kobe'">app btn</button>
  <show-info></show-info>
</template>

<script>
  import { provide, ref } from 'vue'
  import ShowInfo from './ShowInfo.vue'

  export default {
    components: {
      ShowInfo
    },
    setup() {
      const name = ref("why")

      provide("name", name)
      provide("age", 18)

      return {
        name
      }
    }
  }
</script>

<style scoped>
</style>

