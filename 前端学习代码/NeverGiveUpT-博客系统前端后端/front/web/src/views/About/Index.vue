<template>
  <div class="common">
    <!-- :style="{background:`url(https://xuwenliu.github.io/img/archive.jpg) center center no-repeat`,backgroundSize:'cover'}" -->
    <Header :light-index="5" background="transparent"></Header>
    <Footer fixed></Footer>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="关于"></RightConfig>
    </div>
    <mu-carousel
      hide-indicators
      hide-controls
      @change="change"
      style="position: fixed; height: 100%; margin-top: 0"
    >
      <mu-carousel-item v-for="item in info.imgs" :key="item._id">
        <img :src="item.imgUrl" />
      </mu-carousel-item>
    </mu-carousel>

    <div class="content" :style="{ paddingTop: isPC ? '64px' : '56px' }">
      <mu-card class="card" :style="{ marginTop: isPC ? '100px' : '0' }">
        <mu-card-header v-if="isPC || info.showResume">
          <mu-paper v-if="isPC" class="avatar-box" circle :z-depth="5">
            <img class="avatar" v-lazy="avatar" />
          </mu-paper>
          <!-- <mu-button
            @click="goResume"
            v-if="info.showResume"
            :color="randomColor"
          >
            简历
            <mu-icon right value="arrow_forward"></mu-icon>
          </mu-button> -->
        </mu-card-header>
        <!-- <mu-carousel
          :style="{marginTop:isPC || info.showResume?'0.53333rem':'0'}"
          hide-indicators
          hide-controls
          @change="change"
        >
          <mu-carousel-item v-for="item in info.imgs" :key="item._id">
            <img v-lazy="item.imgUrl" />
          </mu-carousel-item>
        </mu-carousel>-->
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
          <mu-button @click="goTkb" v-if="info.showTkb" :color="randomColor">
            TKB
          </mu-button>
        </div>
      </mu-card>
    </div>
  </div>
</template>
<script>
import { randomColor } from "@/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RightConfig from "@/components/RightConfig";

export default {
  name: "about",
  components: {
    Header,
    Footer,
    RightConfig,
  },
  data() {
    return {
      avatar: this.avatar,
      randomColor: randomColor(),
      info: {},
    };
  },
  mounted() {
    this.createdBalls();
    this.getInfo();
  },

  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const res = await this.$axios.get("/about");
      if (res.data) {
        this.info = res.data;
        this.info.tags = this.info.tags.map((item) => {
          return {
            name: item,
            color: randomColor(),
          };
        });
        this.$progress.done();
        loading.close();
      }
    },
    createdBalls() {
      this.randomColor = randomColor();
    },
    change() {
      this.createdBalls();
    },
    remove(index) {
      this.info.tags.splice(index, 1);
    },
    reset() {
      this.getInfo();
    },
    goResume() {
      this.$router.push({
        name: "resume",
      });
    },
    goTkb() {
      this.$router.push({
        name: "videos",
      });
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
  width: 100%;
  height: 100%;
}
.card {
  max-width: 10rem;
  width: 10rem;
  margin: 0 auto;
}
</style>
