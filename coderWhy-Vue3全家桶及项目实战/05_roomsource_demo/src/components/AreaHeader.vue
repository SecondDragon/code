<template>
  <div class="area-header">
    <h3 class="title">{{ title }}</h3>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script setup>

defineProps({
  title: {
    type: String,
    default: "默认标题"
  },
  subtitle: {
    type: String,
    default: "默认子标题"
  }
})

</script>

<style lang="less" scoped>

  .area-header {
    height: 84px;

    .title {
      font-size: 22px;
    }

    .subtitle {
      margin-top: 12px;
      font-size: 16px;
    }
  }

</style>

