<template>
  <div class="app">
    <!-- store中的counter -->
    <h2>App当前计数: {{ $store.state.counter }}</h2>

    <!-- home页面 -->
    <hr>
    <home/>
  </div>
</template>

<script setup>

  import Home from './views/Home.vue'

</script>

<style>
</style>
