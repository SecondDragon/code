<template>
  <render/>
  <h2 class="">内容</h2>
</template>

<!-- <script>
  import { h, ref } from 'vue'
  import Home from "./Home.vue"

  export default {
    setup() {
      const counter = ref(0)

      const increment = () => {
        counter.value++
      }
      const decrement = () => {
        counter.value--
      }

      return () => h("div", { className: "app" }, [
        h("h2", null, `当前计数: ${counter.value}`),
        h("button", { onClick: increment }, "+1"),
        h("button", { onClick: decrement }, "-1"),
        h(Home)
      ])
    }
  }
</script> -->

<script setup>

import { ref, h } from 'vue';
import Home from './Home.vue'

const counter = ref(0)

const increment = () => {
  counter.value++
}
const decrement = () => {
  counter.value--
}

const render = () => h("div", { className: "app" }, [
  h("h2", null, `当前计数: ${counter.value}`),
  h("button", { onClick: increment }, "+1"),
  h("button", { onClick: decrement }, "-1"),
  h(Home)
])

</script>

<style scoped>

</style>
