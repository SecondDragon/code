<template>
  <div>AppContent</div>
  <button @click="changeTitle">修改title</button>

  <!-- 1.计数器 -->
  <!-- <hr>
  <home></home>
  <hr>
  <about></about> -->

  <!-- 2.home和about页面的切换 -->
  <button @click="currentPage = 'home'">home</button>
  <button @click="currentPage = 'about'">about</button>

  <component :is="currentPage"></component>

  <div class="content"></div>

  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
  <br><br><br><br><br><br>
</template>

<script>
  import { ref } from 'vue'
  import Home from './views/Home.vue'
  import About from './views/About.vue'

  import useTitle from './hooks/useTitle'

  export default {
    components: {
      Home,
      About
    },
    setup() {
      const currentPage = ref("home")

      function changeTitle() {
        useTitle("app title")
      }

      return {
        changeTitle,
        currentPage
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 3000px;
    height: 100px;
    background-color: orange;
  }
</style>

