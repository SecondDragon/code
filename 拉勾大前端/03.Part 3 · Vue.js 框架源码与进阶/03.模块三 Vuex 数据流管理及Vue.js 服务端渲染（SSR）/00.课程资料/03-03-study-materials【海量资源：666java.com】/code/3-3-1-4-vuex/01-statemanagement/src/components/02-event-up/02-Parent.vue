<template>
  <div>
    <h1 :style="{ fontSize: hFontSize + 'em'}">Event Up Parent</h1>

    这里的文字不需要变化

    <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
    <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
    <child :fontSize="hFontSize" v-on:enlargeText="hFontSize += $event"></child>
  </div>
</template>

<script>
import child from './02-Child'
export default {
  components: {
    child
  },
  data () {
    return {
      hFontSize: 1
    }
  },
  methods: {
    enlargeText (size) {
      this.hFontSize += size
    }
  }
}
</script>

<style>

</style>