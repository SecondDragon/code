<template>
  <div>
    <h1>Event Bus Sibling01</h1>
    <div class="number" @click="sub">-</div>
    <input type="text" style="width: 30px; text-align: center" :value="value">
    <div class="number" @click="add">+</div>
  </div>
</template>

<script>
import bus from './eventbus'

export default {
  props: {
    num: Number
  },
  created () {
    this.value = this.num
  },
  data () {
    return {
      value: -1
    }
  },
  methods: {
    sub () {
      if (this.value > 1) {
        this.value--
        bus.$emit('numchange', this.value)
      }
    },
    add () {
      this.value++
      bus.$emit('numchange', this.value)
    }
  }
}
</script>

<style>
.number {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  text-align: center;
}
</style>