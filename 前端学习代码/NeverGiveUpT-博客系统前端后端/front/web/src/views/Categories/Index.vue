<template>
  <div
    class="common"
    :style="{background:`url(${categoriesBgImg}) 0px center no-repeat`,backgroundSize:'cover'}"
  >
    <Header :light-index="3" background="transparent"></Header>
    <div v-if="isPC">
      <Footer fixed></Footer>
    </div>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="分类"></RightConfig>
    </div>

    <div :class="isPC?'content':'wap-content'">
      <div class="cols">
        <div class="cols-item" @click="goDetail(item)" v-for="item in categories" :key="item.name">
          <div class="container">
            <div class="front" :style="{backgroundImage:`url(${item.background})`}">
              <div class="inner">
                <p>{{item.name}}</p>
                <span>{{item.articleNum}}</span>
              </div>
            </div>
            <div class="back" :style="{backgroundImage:`url(${item.background})`}">
              <div class="inner">
                <p>{{item.name}}</p>
                <span>{{item.articleNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer v-if="!isPC"></Footer>
    </div>
  </div>
</template>
<script>
import { randomColor } from "@/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RightConfig from "@/components/RightConfig";

export default {
  name: "categories",
  components: {
    Header,
    Footer,
    RightConfig
  },
  data() {
    return {
      randomColor: randomColor(),
      categories: [],
      categoriesBgImg: ""
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const res = await this.$axios.get("/categories");
      if (res.data) {
        this.categories = res.data.list
          ? res.data.list.map((item, index) => {
              return {
                ...item,

                background: `http://img.nevergiveupt.top/${index +
                  2}.png`,
                color: randomColor()
              };
            })
          : [];
        this.categoriesBgImg = res.data.categoriesBgImg;
        this.$progress.done();
        loading.close();
      }
    },
    goDetail(item) {
      this.$router.push({
        name: "categoriesDetails",
        query: {
          id: item._id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  padding-top: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.wap-content {
  position: absolute;
  top: 56px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  padding-top: 20px;
}

.cols {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.cols-item {
  width: calc(25% - 32px);
  margin: 16px;
  cursor: pointer;
}
.container {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-perspective: 1000px;
  perspective: 1000px;
}
.front,
.back {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  text-align: center;
  min-height: 200px;
  height: auto;
  border-radius: 10px;
  color: #fff;
  font-size: 24px;
}
.back {
  background: #cedce7;
  background: -webkit-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: -o-linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background: linear-gradient(45deg, #cedce7 0%, #596a72 100%);
  background-repeat: no-repeat;
}
.front:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  opacity: 0.6;
  background-color: #000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
}
.container:hover .front,
.container:hover .back {
  -webkit-transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  -o-transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1),
    -webkit-transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.inner {
  -webkit-transform: translateY(-50%) translateZ(60px) scale(0.94);
  transform: translateY(-50%) translateZ(60px) scale(0.94);
  top: 50%;
  position: absolute;
  left: 0;
  width: 100%;
  padding: 32px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 1px solid transparent;
  -webkit-perspective: inherit;
  perspective: inherit;
  z-index: 2;
}
.container .back {
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.container .front {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.container:hover .back {
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.container:hover .front {
  -webkit-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.front .inner p {
  font-size: 32px;
  margin-bottom: 32px;
  position: relative;
}
.front .inner p:after {
  content: "";
  width: 64px;
  height: 2px;
  position: absolute;
  background: #c6d4df;
  display: block;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: -12px;
}
.front .inner span {
  color: rgba(255, 255, 255, 0.7);
  font-family: "Montserrat";
  font-weight: 300;
}
@media screen and (max-width: 664px) {
  .cols-item {
    width: calc(33.333333% - 32px);
  }
}
@media screen and (max-width: 768px) {
  .cols-item {
    width: calc(50% - 32px);
  }
}
@media screen and (max-width: 512px) {
  .cols-item {
    width: 80%;
    margin: 0 0 32px 0;
  }
}
</style>