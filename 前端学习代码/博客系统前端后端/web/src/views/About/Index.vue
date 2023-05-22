<template>
  <div class="common">
    <Header :light-index="5" background="transparent"></Header>
    <Footer fixed></Footer>

    <mu-carousel
      hide-indicators
      hide-controls
      style="position: fixed; height: 100%; margin-top: 0"
    >
      <mu-carousel-item v-for="item in info.imgs" :key="item._id">
        <img :src="item.imgUrl" />
      </mu-carousel-item>
    </mu-carousel>

    <div class="content" :style="{ paddingTop: isPC ? '64px' : '56px' }">
      <mu-card class="card" :style="{ marginTop: isPC ? '100px' : '0' }">
        <mu-card-header v-if="isPC">
          <mu-paper v-if="isPC" class="avatar-box" circle :z-depth="5">
            <img class="avatar" v-lazy="avatar" />
          </mu-paper>
        </mu-card-header>

        <mu-card-text>
          <div v-html="info.desc"></div>
        </mu-card-text>
        <div class="tags">
          <mu-chip
            class="tag"
            v-for="(item, index) in info.tags"
            :key="item.name"
            :color="item.color"
            @delete="remove(index)"
            delete
            >{{ item.name }}</mu-chip
          >
          <mu-button
            color="primary"
            v-if="info.tags && info.tags.length === 0"
            @click="reset"
            >reset</mu-button
          >
        </div>
      </mu-card>
    </div>
  </div>
</template>
<script>
import { randomColor } from "@/utils";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "about",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      info: {
        imgs: [
          {
            _id: 1,
            imgUrl: "http://www.nevergiveupt.top/index.jpg",
          },
          {
            _id: 2,
            imgUrl: "http://www.nevergiveupt.top/tags.jpg",
          },
          {
            _id: 3,
            imgUrl: "http://www.nevergiveupt.top/archive.jpg",
          },
        ],
        desc:
          "有4年前端开发经验，熟悉Vue、React、Angular前端框架。熟悉小程序开发（Taro、Remax、MpVue、Wepy、 云开发）。熟悉NodeJs、Koa，Egg等后端知识。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。",
        tags: [
          {
            name: "Vue",
            color: randomColor(),
          },
          {
            name: "React",
            color: randomColor(),
          },
          {
            name: "Node.js",
            color: randomColor(),
          },
        ],
      },
    };
  },
  mounted() {},

  methods: {
    remove(index) {
      this.info.tags.splice(index, 1);
    },
    reset() {
      this.info.tags = [
        {
          name: "Vue",
          color: randomColor(),
        },
        {
          name: "React",
          color: randomColor(),
        },
        {
          name: "Node.js",
          color: randomColor(),
        },
      ];
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  padding-top: 64px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /deep/ .mu-card-header {
    display: flex;
    justify-content: flex-end;
    height: 1.33333rem;
  }
  .avatar-box {
    width: 2.66667rem;
    height: 2.66667rem;
    position: absolute;
    top: -1.33333rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.tags {
  padding: 0.42667rem;
  .tag {
    margin-bottom: 0.42667rem;
    margin-right: 0.42667rem;
  }
}
.mu-carousel {
  height: 5.33333rem;
  margin-top: 0.53333rem;
}
.mu-carousel-item > img {
  height: 100%;
}
.card {
  max-width: 10rem;
  width: 10rem;
  margin: 0 auto;
}
</style>