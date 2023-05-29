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
  name: 'HomePage',
  components: {},
  // Nuxt 中特殊提供的一个钩子函数，专门用于获取页面服务端渲染的数据
  async asyncData () {
    const { data } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })

    // 这里返回的数据会和 data () {} 中的数据合并到一起给页面使用
    return data
    // return {
    //   title: data.title,
    //   posts: data.posts
    // }
  }
  // data () {
  //   return {
  //     title: '',
  //     posts: []
  //   }
  // },
  // async created () {
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: '/data.json'
  //   })
  //   this.title = data.title
  //   this.posts = data.posts
  // }
}
</script>

<style>
</style>
