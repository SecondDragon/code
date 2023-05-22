<template>
  <div
    class="common"
    :style="{
      background: `url(${categoriesDetailBgImg}) 0px center no-repeat`,
      backgroundSize: 'cover',
    }"
  >
    <Header :light-index="3" background="transparent"></Header>
    <div v-if="isPC">
      <Footer fixed></Footer>
    </div>

    <div class="content">
      <mu-paper v-if="isPC" :z-depth="5" class="pc-box">
        <mu-list>
          <div class="sub-title">分类-技术(100)</div>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文章标题</span>
              <span>2021-02-04 09:57</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>

        <div class="pagination">
          <mu-pagination
            raised
            circle
            :total="100"
            :current.sync="page"
            :pageSize.sync="pageSize"
          ></mu-pagination>
        </div>
      </mu-paper>

      <div class="wap-box" v-else>
        <div class="sub-title">分类-技术(100)</div>
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title class="item">
              <span class="title">文章标题</span>
              <span>2021-02-04 09:57</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>
        <Footer></Footer>
      </div>

      <mu-button
        v-show="!isPC"
        @click="$router.go(-1)"
        class="back-fab"
        small
        fab
        color="#fff"
      >
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "categoriesDetails",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      page: 1,
      pageSize: this.isPC ? 10 : 15,
      list: [],
      info: {
        list: [],
      },
      categoriesDetailBgImg: "http://nevergiveupt.top/category.jpg",
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.content {
  padding-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>