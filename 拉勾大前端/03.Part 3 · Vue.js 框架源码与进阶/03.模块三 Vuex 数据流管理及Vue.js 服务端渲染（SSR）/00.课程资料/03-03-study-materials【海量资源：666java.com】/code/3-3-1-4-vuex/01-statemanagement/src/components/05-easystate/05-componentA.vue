<template>
  <div>
    <h1>componentA</h1>
    user name: {{ sharedState.user.name }}
    <button @click="change">Change Info</button>
  </div>
</template>

<script>
import store from './store'
export default {
  methods: {
    change () {
      store.setUserNameAction('componentA')
    }
  },
  data () {
    return {
      privateState: {},
      sharedState: store.state
    }
  }
}
</script>

<style>

</style>