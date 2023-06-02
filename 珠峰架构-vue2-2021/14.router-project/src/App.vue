<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于页面</router-link>
    </div>
    <!-- 匹配路径后对应的组件会显示到router-view中 -->
    <router-view />
  </div>
</template>


