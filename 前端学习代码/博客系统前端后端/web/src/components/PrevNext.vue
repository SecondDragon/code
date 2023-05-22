<template>
  <div class="prev-next">
    <mu-button v-if="prev" flat color="primary" @click="goDetails(prev)">上一篇： {{prev.title}}</mu-button>
    <mu-button v-if="next" flat color="info" @click="goDetails(next)">下一篇： {{next.title}}</mu-button>
  </div>
</template>
<script>
export default {
  props: {
    prev: {
      type: Object
    },
    next: {
      type: Object
    }
  },
  methods: {
    goDetails(item) {
      this.$router.push({
        name: "articlesDetails",
        query: { id: item._id }
      });
      location.reload();
      document.body.scrollIntoView();
    }
  }
};
</script>
<style lang="less" scoped>
.prev-next {
  font-size: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>