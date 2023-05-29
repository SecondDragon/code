<template>
  <div>
    <h1>{{ article.title }}</h1>
    <div>{{ article.body }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticlePage',
  async asyncData (context) {
    console.log(context)
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    const id = Number.parseInt(context.params.id)
    return {
      article: data.posts.find(item => item.id === id)
    }
  }
}
</script>

<style>

</style>
