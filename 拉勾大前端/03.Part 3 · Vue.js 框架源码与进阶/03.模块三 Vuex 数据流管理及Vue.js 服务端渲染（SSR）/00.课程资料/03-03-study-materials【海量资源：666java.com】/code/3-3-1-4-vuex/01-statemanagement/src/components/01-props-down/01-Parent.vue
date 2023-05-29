<template>
  <div>
    <h1>Props Down Parent</h1>
    <child title="My journey with Vue"></child>
  </div>
</template>

<script>
import child from './01-Child'
export default {
  components: {
    child
  }
}
</script>

<style>

</style>