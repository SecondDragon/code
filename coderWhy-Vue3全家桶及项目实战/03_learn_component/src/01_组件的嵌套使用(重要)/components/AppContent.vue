<template>
  <div class="content">
    <div class="banner">banner</div>
    <app-content-list></app-content-list>
  </div>
</template>

<script>
  import AppContentList from './AppContentList'

  export default {
    components: {
      AppContentList
    }
  }
</script>

<style scoped>
  .content {
    background-color: blue;
    color: white;
  }
</style>

