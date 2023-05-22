<template>
  <div class="app">
    <!-- 1.高评价 -->
    <room-area :area-data="highScore"></room-area>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import RoomArea from './components/RoomArea.vue'

  // 1.获取数据
  // import highScore from "./data/high_score.json"
  // console.log(highScore)


  // 2.模拟网络请求数据
  const highScore = ref({})
  setTimeout(() => {
    import("./data/high_score.json").then(res => {
      highScore.value = res.default
    })
  }, 1000);

</script>

<style lang="less" scoped>
  .app {
    width: 1032px;
    padding: 40px;
    margin: 0 auto;
  }
</style>
