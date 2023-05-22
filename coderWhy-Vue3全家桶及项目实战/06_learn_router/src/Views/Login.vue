<template>
  <div class="login">
    <h2>登录页面</h2>
    <button @click="loginClick">登录</button>
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router'

  const router = useRouter()

  function loginClick() {
    // 向服务器发送请求, 服务器会返回token
    localStorage.setItem("token", "coderwhy")

    // 跳转到order页面
    router.push("/order")
  }

</script>

<style scoped>
</style>

