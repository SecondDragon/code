<template>
  <div id="app">
    <h2>{{ title }}</h2>
    <ul>
      <li
        v-for="item in posts"
        :key="item.id"
      >{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      title: '',
      posts: []
    }
  },
  async created () {
    const { data } = await axios({
      method: 'GET',
      url: '/data.json'
    })
    this.title = data.title
    this.posts = data.posts
  }
}
</script>

<style>
</style>
