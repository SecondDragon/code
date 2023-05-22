<template>
  <div class="app">
    <button @click="changeName">修改name</button>
    <button @click="incrementLevel">递增level</button>
    <button @click="changeInfo">修改info</button>
    <h2>Store Name: {{ $store.state.name }}</h2>
    <h2>Store Level: {{ $store.state.level }}</h2>
  </div>
</template>

<script>

  import { CHANGE_INFO } from "@/store/mutation_types"

  export default {
    computed: {
    },
    methods: {
      changeName() {
        // this.$store.state.name = "李银河"
        this.$store.commit("changeName", "王小波")
      },
      incrementLevel() {
        this.$store.commit("incrementLevel")
      },
      changeInfo() {
        this.$store.commit(CHANGE_INFO, {
          name: "王二",
          level: 200
        })
      }
    }
  }
</script>

<script setup>

</script>

<style scoped>
</style>

