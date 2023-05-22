<template>
  <h2>Home组件</h2>
</template>

<script>
  import messageMixin from '../mixins/message-mixin'

  export default {
    // options api
    components: {

    },
    mixins: [messageMixin],
    data() {
      return {
        homeNames: [ "abc", "cba" ]
      }
    },
    methods: {

    },
    created() {
      console.log("home created")
    }
  }
</script>

<style scoped>
</style>

