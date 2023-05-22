<template>
  <div class="home">
    <h2>当前计数: {{ $store.state.counter }}</h2>
    <button @click="counterBtnClick">发起action修改counter</button>
    <h2>name: {{ $store.state.name }}</h2>
    <button @click="nameBtnClick">发起action修改name</button>
  </div>
</template>

<script>

  export default {
    methods: {
      counterBtnClick() {
        this.$store.dispatch("incrementAction")
      },
      nameBtnClick() {
        this.$store.dispatch("changeNameAction", "aaa")
      }
    }
  }
</script>

<script setup>

</script>

<style scoped>
</style>

