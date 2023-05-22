<template>
  <div>ShowInfo</div>
</template>

<script>
  export default {
    // methods: {
    //   showInfoFoo() {
    //     console.log("showInfo foo function")
    //   }
    // }
    setup() {
      function showInfoFoo() {
        console.log("showInfo foo function")
      }

      return {
        showInfoFoo
      }
    }
  }
</script>

<style scoped>
</style>

