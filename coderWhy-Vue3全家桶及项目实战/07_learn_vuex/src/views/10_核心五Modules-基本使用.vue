<template>
  <div class="home">
    <h2>Home Page</h2>
    <ul>
      <!-- 获取数据: 需要从模块中获取 state.modulename.xxx -->
      <template v-for="item in $store.state.home.banners" :key="item.acm">
        <li>{{ item.title }}</li>
      </template>
    </ul>
  </div>
</template>

<script>
</script>

<script setup>

  import { useStore } from 'vuex'

  // 告诉Vuex发起网络请求
  const store = useStore()
  store.dispatch("fetchHomeMultidataAction").then(res => {
    console.log("home中的then被回调:", res)
  })

</script>


<style scoped>
</style>

