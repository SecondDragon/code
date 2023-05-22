<template>
  <div class="app">
    <!-- <h2 class="title">当前计数: {{ counter }}</h2>
    <button @click="increment">+1</button> -->
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ref, nextTick } from 'vue'

const counter = ref(100)
const name = ref('why')
function increment() {
  counter.value += 100
  counter.value += 100
  counter.value += 100
  counter.value += 100
  counter.value += 100
  counter.value += 100
  counter.value += 100
  counter.value += 100

  name.value = 'kobe'

  // DOM操作
  // nextTick的回调是一个宏任务还是微任务
  // Promise.resolve().then(fn)
  nextTick(() => {
    const titleEl = document.querySelector('.title')
    console.log(titleEl?.textContent)
  })
}
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}

.test {
  // 根元素
  color: blue;

  :deep(.title) {
    font-size: 100px;
  }
}
</style>
