<template>
  <div class="z-transfer__panel">
    <z-checkbox v-model="allChecked" @change="handleCheckedAllChange">全选、反选</z-checkbox>

    <div class="z-transfer__body">
      <z-checkbox-group v-model="checked">
        <!-- checbox value => label(key) v-mdeol="key"-->
        <z-checkbox
          :disabled="item[disabledProp]"
          v-for="item in data"
          :key="item[keyProp]"
          :label="item[keyProp]"
        >
          {{ item[labelProp] }}</z-checkbox
        >
      </z-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Props } from "./transfer.type";
import { defineComponent, PropType, reactive, toRefs } from "vue";
import ZCheckboxGroup from "@z-ui/checkbox-group";
import ZCheckbox from "@z-ui/checkbox";
import { useCheck } from "./useCheck";
export default defineComponent({
  name: "ZTransferPanel",
  components: {
    ZCheckbox,
    ZCheckboxGroup,
  },
  props: {
    data: {
      type: Array, // 是在外层筛出来的数据
      default: () => [],
    },
    props: Object as PropType<Props>,
  },
  emits:['checked-change'],
  setup(props) {
    // 应该有一个属于面板自己的状态
    const panelState = reactive({
      checked: [], // 选中的值
      allChecked: false, // 是否全选
    });

    // 根据props 算出key  禁用 对应的值 用于模板渲染
    let { keyProp, labelProp, disabledProp,handleCheckedAllChange } = useCheck(props,panelState);

    return {
      keyProp,
      labelProp,
      disabledProp,
      handleCheckedAllChange,
      ...toRefs(panelState),
    };
  },
});
</script>
