<template>
  <div class="z-checkbox-group">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, provide } from "vue";

export default defineComponent({
  name: "ZCheckboxGroup",
  props: {
    modelValue: Array, // 还是需要 父组件将modelValue这个数组传递给儿子
  },
  emits: ["change", "update:modelValue"],
  setup(props, { emit }) {
    // vue3 provide inject computed watch getInstance
    // 将props属性创造出一个新的来交给儿子
    const modelValue = computed(() => props.modelValue);
    const changeEvent = (val) => { // 儿子等会调用这个方法去通知更新
      emit("change", val);  // change
      emit("update:modelValue", val); // v-model
    };
    provide('ZCheckboxGroup',{
        name:'ZCheckboxGroup',
        modelValue,
        changeEvent
    })
  },
});
</script>
