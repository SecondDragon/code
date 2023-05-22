<template>
  <div class="product">
    <h2>我是商品标题</h2>
    <p>我是商品描述, 9.9秒杀</p>
    <div>价格: {{price}}</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      price: 9.9
    }
  }
}

</script>

<style>
</style>