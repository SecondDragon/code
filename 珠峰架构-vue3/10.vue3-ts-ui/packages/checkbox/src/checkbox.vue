<template>
  <div class="z-checkbox">
    <span class="z-checkbox__input">
      <input
        type="checkbox"
        v-model="model"
        :checked="isChecked"
        @change="handleChange"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :value="label"
      />
      <!-- vue的特点 如果对于checkbox而言 绑定的数据是数组，那么value在v-model中的数据中则被选中 -->
    </span>
    <span class="z-checkbox-label">
      <slot>{{label}}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCheckbox } from "./useCheckbox";

export default defineComponent({
  name: "ZCheckbox",
  props: {
    // 属性校验 vue2 里面也是一样
    name: String,
    indeterminate: Boolean,
    checked: Boolean,
    disabled: Boolean,
    label: [String, Number, Boolean],
    modelValue: [String, Number, Boolean],
  },
  emits: ["update:modelValue", "change"], // ts没提示 而且方法会被绑定到根上
  setup(props, { emit, attrs }) {
    return useCheckbox(props);
  },
});
</script>