<template>
  <div class="app">
    <button @click="incrementLevel">修改level</button>
    <!-- 1.在模板中直接使用多个状态 -->
    <h2>name: {{ $store.state.name }}</h2>
    <h2>level: {{ $store.state.level }}</h2>
    <h2>avatar: {{ $store.state.avatarURL }}</h2>

    <!-- 2.计算属性(映射状态: 数组语法) -->
    <!-- <h2>name: {{ name() }}</h2>
    <h2>level: {{ level() }}</h2> -->

    <!-- 3.计算属性(映射状态: 对象语法) -->
    <!-- <h2>name: {{ sName }}</h2>
    <h2>level: {{ sLevel }}</h2> -->

    <!-- 4.setup计算属性(映射状态: 对象语法) -->
    <!-- <h2>name: {{ cName }}</h2>
    <h2>level: {{ cLevel }}</h2> -->
    
    <!-- 5.setup计算属性(映射状态: 对象语法) -->
    <h2>name: {{ name }}</h2>
    <h2>level: {{ level }}</h2>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      fullname() {
        return "xxx"
      },
      // name() {
      //   return this.$store.state.name
      // },
      ...mapState(["name", "level", "avatarURL"]),
      ...mapState({
        sName: state => state.name,
        sLevel: state => state.level
      })
    }
  }
</script>

<script setup>
  import { computed, toRefs } from 'vue'
  import { mapState, useStore } from 'vuex'
  import useState from "../hooks/useState"

  // 1.一步步完成
  // const { name, level } = mapState(["name", "level"])
  // const store = useStore()
  // const cName = computed(name.bind({ $store: store }))
  // const cLevel = computed(level.bind({ $store: store }))

  // 2.使用useState
  // const { name, level } = useState(["name", "level"])

  // 3.直接对store.state进行解构(推荐)
  const store = useStore()
  const { name, level } = toRefs(store.state)

  function incrementLevel() {
    store.state.level++
  }

</script>

<style scoped>
</style>

