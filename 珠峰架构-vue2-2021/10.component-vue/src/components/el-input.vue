<template>
  <input type="text" :value="value" @input="handleInput" />
</template>

<script>
export default {
  name: "elInput",
  props: {
    value: String,
  },
  methods: {
    handleInput(e) {
        this.$emit('input',e.target.value)
        this.$dispatch('elFormItem','changeValue');
        // this.$emit('update:value',e.target.value)
    },
  },
};
</script>