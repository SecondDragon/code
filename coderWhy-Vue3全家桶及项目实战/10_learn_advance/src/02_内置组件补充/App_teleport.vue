<template>
  <div class="app">
    <div class="hello">
      <p class="content">
        <!-- <teleport to="body">
          <hello-world/>
        </teleport> -->
        <teleport to="#abc">
          <hello-world/>
        </teleport>
      </p>
    </div>

    <div class="content">
      <teleport to="#abc">
        <h2>哈哈哈哈哈</h2>
      </teleport>
    </div>
  </div>
</template>

<script setup>

import HelloWorld from "./HelloWorld.vue"

</script>

<style scoped>

</style>
