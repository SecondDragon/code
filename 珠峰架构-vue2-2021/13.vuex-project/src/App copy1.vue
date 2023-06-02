<template>
  <div id="app">
    学校的年龄{{this.$store.state.name}} {{this.$store.state.age}} <br>
    我的年龄是 {{this.$store.getters.myAge}} 
    我的年龄是 {{this.$store.getters.myAge}} 
    
    <button @click="$store.commit('changeAge',10)">更改年龄</button>
    <button @click="$store.dispatch('changeAge',10)">异步年龄</button>

    <hr>

   t1的年龄 {{this.$store.state.a.name}}  {{this.$store.state.a.age}} <br>

   t1的计算年龄  {{this.$store.getters['a/myAge']}}
  <button @click="$store.commit('a/changeAge',10)">t1更改年龄</button>
  <hr>

  c的年龄 {{this.$store.state.a.c.age}}
  <button @click="$store.commit('a/c/changeAge',10)">t1更改年龄</button>
  </div>
</template>



<script>
export default {
  name:'app',
 
}
</script>

<style>

</style>
