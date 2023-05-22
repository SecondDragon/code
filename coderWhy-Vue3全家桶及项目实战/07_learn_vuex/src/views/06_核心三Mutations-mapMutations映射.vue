<template>
  <div class="app">
    <button @click="changeName('王小波')">修改name</button>
    <button @click="incrementLevel">递增level</button>
    <button @click="changeInfo({ name: '王二', level: 200 })">修改info</button>
    <h2>Store Name: {{ $store.state.name }}</h2>
    <h2>Store Level: {{ $store.state.level }}</h2>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { CHANGE_INFO } from "@/store/mutation_types"

  export default {
    computed: {
    },
    methods: {
      btnClick() {
        console.log("btnClick")
      },
      // ...mapMutations(["changeName", "incrementLevel", CHANGE_INFO])
    }
  }
</script>

<script setup>

  import { mapMutations, useStore } from 'vuex'
  import { CHANGE_INFO } from "@/store/mutation_types"

  const store = useStore()

  // 1.手动的映射和绑定
  const mutations = mapMutations(["changeName", "incrementLevel", CHANGE_INFO])
  const newMutations = {}
  Object.keys(mutations).forEach(key => {
    newMutations[key] = mutations[key].bind({ $store: store })
  })
  const { changeName, incrementLevel, changeInfo } = newMutations

</script>

<style scoped>
</style>

