<template>
  <div id="app">
    学校的年龄{{ name }} 我的年龄是 {{ myAge }}
    <button @click="changeAge(10)">更改年龄</button>
    <button @click="changeAgeAsync(10)">异步年龄</button>
  </div>
</template>

<script>
import store from "./store";
// import { mapState, mapGetters, mapMutation, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutation(["changeAge"]),
    // changAge(payload){
    //   this.$store.commit('changeAge', payload)
    // },
    changeAgeAsync(payload) {
      this.$store.dispatch("changeAge", payload);
    },
  },
  computed: {
    ...mapState(["name"]), // mapXxxx返回的是对象
    ...mapGetters(["myAge"]),
    // name(){
    //   return this.$store.state.name
    // },
    // myAge(){
    //   return this.$store.getters.myAge
    // }
  },
};
</script>

<style>
</style>
