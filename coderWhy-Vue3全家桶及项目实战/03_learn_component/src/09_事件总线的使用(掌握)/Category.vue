<template>
  <div>
    <h2>Category</h2>
  </div>
</template>

<script>
  import eventBus from './utils/event-bus'

  export default {
    methods: {
      whyEventHandler() {
        console.log("whyEvent在category中监听")
      }
    },
    created() {
      eventBus.on("whyEvent", this.whyEventHandler)
    },
    unmounted() {
      console.log("category unmounted")
      eventBus.off("whyEvent", this.whyEventHandler)
    }
  }
</script>

<style scoped>
</style>

