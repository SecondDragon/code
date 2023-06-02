<template>
  <div>
    <div class="header" v-if="hasNav">
      <img src="@/assets/logo.png" alt />
      <nav class="nav">
        <!-- router-link -->
        <li><nuxt-link to="/">首页</nuxt-link></li>
        <li><nuxt-link to="/category">分类</nuxt-link></li>
        <li><nuxt-link to="/about">关于我</nuxt-link></li>
      </nav>
    </div>
    <!-- router-view  Nuxt -->
    <Nuxt />
  </div>
</template>
<script >
export default {
  computed:{
    hasNav(){
      return this.$route.path !== '/login' && this.$route.path !== '/reg' 
    }
  },
  middleware(){
    console.log('layouts')
  }
}
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  .nav li{
      display: inline-block;
      margin: 0 20px;
      font-weight: bold;
      
  }
  img {
    width: 150px;
  }
}



</style>
