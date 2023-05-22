<template>
  <div class="app">
    <button @click="changeAge">修改name</button>

    <h2>doubleCounter: {{ doubleCounter }}</h2>
    <h2>friendsTotalAge: {{ totalAge }}</h2>
    <h2>message: {{ message }}</h2>

    <!-- 根据id获取某一个朋友的信息 -->
    <h2>id-111的朋友信息: {{ getFriendById(111) }}</h2>
    <h2>id-112的朋友信息: {{ getFriendById(112) }}</h2>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(["doubleCounter", "totalAge"]),
      ...mapGetters(["getFriendById"])
    }
  }
</script>

<script setup>

  import { computed, toRefs } from 'vue';
  import { mapGetters, useStore } from 'vuex'

  const store = useStore()

  // 1.使用mapGetters
  // const { message: messageFn } = mapGetters(["message"])
  // const message = computed(messageFn.bind({ $store: store }))

  // 2.直接解构, 并且包裹成ref
  // const { message } = toRefs(store.getters)

  // 3.针对某一个getters属性使用computed
  const message = computed(() => store.getters.message)

  function changeAge() {
    store.state.name = "kobe"
  }

</script>

<style scoped>
</style>

