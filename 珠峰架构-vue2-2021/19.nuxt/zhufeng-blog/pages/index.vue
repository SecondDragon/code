<template>
    <div>
      <li v-for="(l,index) in list" :key="index">
        <nuxt-link :to="{name:'detail-uid',params:{uid:l._id}}">{{l.title}}</nuxt-link></li> 
    </div>
</template>

<!-- vue3  (validate fetch) 个性配置  seo优化   -->

<style lang="scss" scoped>

div{
  color:$color;
}
</style>

<script >
export default {
  async asyncData({$axios}){
    let {list} = await $axios.get('/api/article');
    return {list}
  }
 
}
</script>