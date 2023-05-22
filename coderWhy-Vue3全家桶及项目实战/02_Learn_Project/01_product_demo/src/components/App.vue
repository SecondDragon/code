<template>
  <h2>{{title}}</h2>
  <h2>当前计数: {{counter}}</h2>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>

  <product-item></product-item>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      title: "我还是标题",
      counter: 0
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    }
  }
}
</script>

<style>
  h2 {
    color: red;
  }
</style>
