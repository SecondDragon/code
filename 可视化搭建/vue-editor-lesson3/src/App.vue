<template>
  <div class="app">
    <Editor v-model="state" :formData="formData"></Editor>


  </div>
</template>

<script>
import { ref ,provide} from 'vue';
import data from './data.json';
import Editor from './packages/editor';
import {registerConfig as config} from './utils/editor-config';
import Range from './components/Range.jsx'
export default {
  components:{
    Editor,
    Range
  },
  setup(){
    const state = ref(data);
    provide('config',config); // 将组件的配置直接传值

    const formData = ref({
      username:'zfjg',
      password:123,
      start:0,
      end:100
    })

    return {
      state,
      formData
    }
  }
}

</script>

<style lang="scss">
.app{
  position:fixed;
  top:20px;
  left:20px;
  right:20px;
  bottom:20px;
}
</style>
