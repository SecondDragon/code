<template>
  <div>
    <IndexAnimation></IndexAnimation>
    <Header background="transparent"></Header>
    <Footer fixed></Footer>
    <div class="common">
      <div class="home" @click="scan">
        <p>{{ info.introduction }}</p>
      </div>
      <div v-if="isPC" class="right-box">
        <RightConfig showPosition="首页"></RightConfig>
      </div>
    </div>
  </div>
</template>
<script>
let timer = 0;
let i = 0;
import IndexAnimation from "@/components/IndexAnimation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import RightConfig from "@/components/RightConfig";
import { wxHelper } from "@/utils";
export default {
  name: "index",
  components: {
    IndexAnimation,
    Header,
    Footer,
    RightConfig,
  },
  data() {
    return {
      info: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    scan() {
      wxHelper.call("scanQRCode", {
        needResult: 0,
        success: function (res) {
          console.log("scanQRCode", res.resultStr); // 扫码结果
        },
      });
    },
    async getInfo() {
      this.$progress.start();
      const res = await this.$axios.get("/home");

      if (res.data) {
        this.info = {
          ...res.data,
          introductionTarget: res.data.introduction,
        };
        this.$progress.done();
        if (this.info.effects) {
          this.typing();
        } else {
          this.info.introduction = this.info.introductionTarget;
        }
      }
    },
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