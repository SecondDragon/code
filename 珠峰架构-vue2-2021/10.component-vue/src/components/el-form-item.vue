<template>
  <div>
    <label></label>
    <slot></slot>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "elFormItem",
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  inject: ["elForm"],
  mounted() {
    this.$on("changeValue", () => {
      // 需要获取最新的值检测是否合法, 去全部数据中通过prop进行查找
      this.validate();
    });
  },
  methods: {
    validate() {
      let newValue = this.elForm.model[this.prop];
      let rule = this.elForm.rules[this.prop];
      // async-validator  -> api
      return true;
    },
  },
};
</script>
