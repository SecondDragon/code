<template>
  <div class="about">
    <h2>About: {{ $route.query }}</h2>
    <button @click="backBtnClick">返回</button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function backBtnClick() {
    // router.back()
    // router.forward()

    // go(delta)
    // go(1) -> forward()
    // go(-1) -> back()
    router.go(-1)
  }

</script>

<style scoped>
</style>

