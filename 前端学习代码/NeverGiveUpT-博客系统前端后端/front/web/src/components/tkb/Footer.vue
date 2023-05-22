<template>
  <div>
    <!-- 底部导航 -->
    <mu-bottom-nav @change="go" class="bottom-nav" :value.sync="currentShift">
      <mu-bottom-nav-item
        v-for="item in tabs"
        :key="item.value"
        :value="item.value"
        :title="item.title"
        :icon="item.icon"
      ></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>
<script>
export default {
  props: {
    shift: {
      type: String,
      default: "pictures",
    },
  },
  data() {
    return {
      currentShift: this.shift,
      tabs: [
        {
          value: "videos",
          title: "视频",
          icon: "ondemand_video",
        },
        {
          value: "stars",
          title: "明星",
          icon: "star",
        },
        {
          value: "books",
          title: "小说",
          icon: "books",
        },
        {
          value: "pictures",
          title: "图片",
          icon: "photo",
        },
      ],
    };
  },
  methods: {
    go(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>