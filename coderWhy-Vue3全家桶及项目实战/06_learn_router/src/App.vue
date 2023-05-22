<template>
  <div class="app">
    <h2>App Content</h2>
    <div class="nav">
      <router-link to="/home" replace>首页</router-link>
      <!-- <router-link :to="{ path: '/home' }" replace>首页</router-link> -->
      <router-link to="/about" replace active-class="active">关于</router-link>

      <router-link to="/user/123">用户123</router-link>
      <router-link to="/user/321">用户321</router-link>
      <router-link to="/order">订单</router-link>

      <!-- 其他元素跳转 -->
      <span @click="homeSpanClick">首页</span>
      <button @click="aboutBtnClick">关于</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 监听元素的点击
  function homeSpanClick() {
    // 跳转到首页
    // router.push("/home")
    router.push({
      // name: "home"
      path: "/home"
    })
  }
  function aboutBtnClick() {
    // 跳转到关于
    router.push({
      path: "/about",
      query: {
        name: "why",
        age: 18
      }
    })
  }

</script>

<style>

  .router-link-active {
    color: red;
    font-size: 20px;
  }

  .active {
    color: red;
    font-size: 20px;
  }

</style>
