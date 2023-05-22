<template>
  <div class="app">
    <h2>App</h2>
    <router-link to="/main">主要</router-link>
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
interface IKun {
  name: string
}

const ikun: IKun = {
  name: 'kobe'
}
console.log(ikun)
</script>

<style scoped></style>
