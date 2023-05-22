<template>
  <div class="app">
    <h2>Home当前计数: {{ $store.state.counter }}</h2>
    <h2>Computed当前计数: {{ storeCounter }}</h2>
    <h2>Setup当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button>
  </div>
</template>

<script>
  export default {
    computed: {
      storeCounter() {
        return this.$store.state.counter
      }
    }
  }
</script>

<script setup>
  import { toRefs } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const { counter } = toRefs(store.state)
  
  function increment() {
    // store.state.counter++
    store.commit("increment")
  }
</script>

<style scoped>
</style>

