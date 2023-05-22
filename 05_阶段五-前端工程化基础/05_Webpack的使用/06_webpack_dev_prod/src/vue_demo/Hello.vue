<template>
  <div>
    <!-- html -->
    <h2 class="title_vue">{{title}}</h2>
    <p class="content_vue">
      我是内容, 哈哈哈哈哈哈哈哈
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "我是Vue的标题"
      }
    }
  }
</script>

<style>
  .title_vue {
    color: green;
    font-size: 100px;
  }

  .content_vue {
    color: yellow;
    font-size: 30px;
  }
</style>

