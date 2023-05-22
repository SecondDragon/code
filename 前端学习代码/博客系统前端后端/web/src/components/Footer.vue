<template>
  <div class="footer" :class="{ 'fixed-footer': fixed }">
    <div class="copyright">
      <a target="_blank" href="http://beian.miit.gov.cn"
        >Copyright © 2020 NeverGiveUpT・蜀ICP备2020026338号</a
      >
    </div>
    <div>本系统由Vue+Muse-UI提供技术支持</div>
  </div>
</template>
<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}

.footer {
  text-align: center;
  font-size: 0.26667rem;
  margin: 30px 0;
  .copyright {
    a {
      color: inherit;
    }
  }
}
</style>