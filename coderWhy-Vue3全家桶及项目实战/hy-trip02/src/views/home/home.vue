<template>
  <div class="home">
    <home-nav-bar/>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'

// import hyRequest from "@/services/request/index"

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
// 1.热门建议
// const hotSuggests = ref([])
// hyRequest.get({
//   url: "/home/hotSuggests"
// }).then(res => {
//   hotSuggests.value = res.data
// })
// 2.热门建议
// const categories = ref([])
// hyRequest.get({
//   url: "/home/categories"
// }).then(res => {
//   categories.value = res.data
// })



</script>

<style lang="less" scoped>
.home {
  padding-bottom: 100px;
}

.banner {
  img {
    width: 100%;
  }
}

</style>
