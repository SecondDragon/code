<template>
  <div id="app">
    学校的年龄{{ this.$store.state.name }} {{ this.$store.state.age }} <br />
    我的年龄是 {{ this.$store.getters.myAge }} 我的年龄是
    {{ this.$store.getters.myAge }}
  <button @click="$store.state.age++">非法更改状态</button>
    <button @click="$store.commit('changeAge', 10)">更改年龄</button>
    <button @click="$store.dispatch('changeAge', 10)">异步年龄</button>

    <hr />

    t1的年龄 {{ this.$store.state.a.name }} {{ this.$store.state.a.age }} <br />

    t1的计算年龄 {{ this.$store.getters["a/myAge"] }}
    <button @click="$store.commit('a/changeAge', 10)">t1更改年龄</button>
    <hr />

    c的年龄 {{ this.$store.state.a.c.age }}
    <button @click="$store.commit('a/c/changeAge', 10)">t1更改年龄</button>

    <hr />
    <button @click="registerModule">动态注册模块</button>

    <hr />
    b模块 ({{ $store.state.b && $store.state.b.name }}
    {{ $store.state.b && $store.state.b.age }})
        {{ $store.getters.bAge && $store.getters.bAge }}
  </div>
</template>



<script>
import store from "./store";
export default {
  name: "app",
  methods: {
    registerModule() {
      store.registerModule("b", {
        state: {
          name: "jiangwen",
          age: 30,
        },
        getters:{
          bAge(state){
            return state.age+1;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>
