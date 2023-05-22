<template>
  <div class="home">
    <h2>Home</h2>

    <div class="home-nav">
      <router-link to="/home/recommend">推荐</router-link>
      <router-link to="/home/ranking">排行</router-link>
    </div>

    <button @click="logoutClick">退出登录</button>

    <!-- 占位组件 -->
    <router-view></router-view>
  </div>
</template>

<script setup>

  function logoutClick() {
    localStorage.removeItem("token")
  }

</script>

<style scoped>
</style>

