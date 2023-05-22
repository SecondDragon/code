# 第14节：Footer组件

## 1.components下新建Footer.vue

```vue
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
```

## 2.views/Home/Index.vue使用

导入Footer组件

```vue
<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
      <div class="home">
        <p>{{ info.introduction }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexAnimation from "@/components/IndexAnimation";

let i = 0;
let timer = null;
export default {
  name: "index",
  components: {
    Header,
    Footer,
    IndexAnimation,
  },
  data() {
    return {
      info: {
        introduction: "",
        introductionTarget: "There is a kind of call to eat together.",
      },
    };
  },
  mounted() {
    this.typing();
  },
  methods: {
    typing() {
      if (i <= this.info.introductionTarget.length) {
        this.info.introduction =
          this.info.introductionTarget.slice(0, i++) + "_";
        timer = setTimeout(this.typing, 100);
      } else {
        this.info.introduction = this.info.introductionTarget; //结束打字,移除 _ 光标
        clearTimeout(timer);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
</style>
```





