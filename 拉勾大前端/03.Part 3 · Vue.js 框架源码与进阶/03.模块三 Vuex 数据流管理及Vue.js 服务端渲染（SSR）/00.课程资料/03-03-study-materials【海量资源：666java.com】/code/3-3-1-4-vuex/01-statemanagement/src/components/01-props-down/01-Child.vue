<template>
  <div>
    <h1>Props Down Child</h1>
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  // props: ['title'],
  props: {
    title: String
  }
}
</script>

<style>

</style>