<template>
  <div id="app">
      <Foo></Foo>
      <Bar></Bar>
  </div>
</template>
<script>
import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue'
export default {
    components:{
        Bar,
        Foo
    }
}
</script>
