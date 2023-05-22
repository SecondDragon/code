<template>
  <div class="app">
    <button @click="counter++">+1</button>

    <!-- 1.参数-修饰符-值 -->
    <!-- <h2 v-why:kobe.abc.cba="message">哈哈哈哈</h2> -->

    <!-- 2.价格拼接单位符号 -->
    <h2 v-unit> {{ 111 }} </h2>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const counter = ref(0)

const message = '你好啊, 李银河'

const vWhy = {
  mounted(el, bindings) {
    console.log(bindings)
    el.textContent = bindings.value
  }
}

</script>

<style scoped>

</style>
