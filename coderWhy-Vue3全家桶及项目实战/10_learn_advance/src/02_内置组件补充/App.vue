<template>
  <div class="app">
    <suspense>
      <template #default>
        <async-home/>
      </template>
      <template #fallback>
        <h2>Loading</h2>
      </template>
    </suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncHome = defineAsyncComponent(() => import("./AsyncHome.vue"))

</script>

<style scoped>

</style>
