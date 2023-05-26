<template>
  <button :class="classs" @click="handleClick" >
      <i v-if="loading" class="z-icon-loading"></i>
      <i v-if="icon && !loading" :class="icon"></i>
      <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>


<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
type IButtonType =
  | "primary"
  | "warning"
  | "danger"
  | "default"
  | "info"
  | "success";

export default defineComponent({
  name: "ZButton",
  props: {
    type: {
      type: String as PropType<IButtonType>,
      default: "primary",
      vaildator: (val: string) => {
        return [
          "primary",
          "warning",
          "danger",
          "default",
          "info",
          "success",
        ].includes(val);
      },
    },
    icon: {
      type: String,
      default: "",
    },
    disabeld: Boolean,
    loading: Boolean,
    round: Boolean,
  },
  emits:['click'],
  
  setup(props, ctx) { // instance 里面摘出了几个属性 给了ctx
    // 我们所有的组件都不会在用optionsApi (this) 全部采用compostionApi
    const classs = computed(() => [
      // --
      "z-button",
      "z-button--" + props.type,
      {
          "is-disabled":props.disabeld,
          "is-loading":props.loading,
          "is-round":props.round
      }
    ]);
    const handleClick = (e)=>{
        ctx.emit('click',e)
    }
    return {
        classs,
        handleClick
    };
  },
});
</script>
