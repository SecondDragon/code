<template>
  <div id="app">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-o"  to="/lesson">我的课程</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/profile">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
/* 这里我们可以去覆盖vant的样式 */
#app {
  .van-dropdown-menu__bar,.van-nav-bar{
    background-color:$background
  }
  .van-dropdown-menu__title,.van-nav-bar__title{
    color:$color
  }
}
</style>
