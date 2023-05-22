<template>
  <div>ShowInfo: {{ name }}-{{ age }}-{{ height }} </div>
</template>

<script>
  import { inject } from 'vue'

  export default {
    // inject的options api注入, 那么依然需要手动来解包
    // inject: ["name", "age"],
    setup() {
      const name = inject("name")
      const age = inject("age")
      const height = inject("height", 1.88)

      return {
        name,
        age,
        height
      }
    }
  }
</script>

<style scoped>
</style>

