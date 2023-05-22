<template>
  <div class="app">
    <h2 class="title">我是App.vue中的h2元素</h2>

    <!-- AppHeader -->
    <AppHeader></AppHeader>
  </div>
</template>

<script>

import AppHeader from "./components/AppHeader"

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
  .title {
    color: red;
  }
</style>
