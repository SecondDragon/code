<template>
  <div
    class="common"
    :style="{background:`url(${categoriesDetailBgImg}) 0px center no-repeat`,backgroundSize:'cover'}"
  >
    <Header :light-index="3" background="transparent"></Header>
    <div v-if="isPC || list.length <=10">
      <Footer fixed></Footer>
    </div>
    <div v-if="isPC" class="right-box">
      <RightConfig showPosition="分类详情"></RightConfig>
    </div>
    <div class="content">
      <mu-paper v-if="isPC" :z-depth="5" class="pc-box">
        <mu-list>
          <div class="sub-title">分类-{{info.name}}({{info.totalCount}})</div>
          <mu-list-item
            button
            v-for="(item,index) in info.list"
            :key="index"
            @click="goArticlesDetails(item)"
          >
            <mu-list-item-title class="item">
              <span class="title">{{item.title}}</span>
              <span>{{item.createTime | filterDate}}</span>
            </mu-list-item-title>
          </mu-list-item>
        </mu-list>

        <div v-if="info.totalCount > pageSize" class="pagination">
          <mu-pagination
            raised
            circle
            :total="info.totalCount"
            :current.sync="page"
            :pageSize.sync="pageSize"
            @change="pageChange"
          ></mu-pagination>
        </div>
      </mu-paper>

      <div class="wap-box" v-else :style="{height:moreHeight}">
        <div class="sub-title">分类-{{info.name}}({{info.totalCount}})</div>
        <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
          <mu-list>
            <mu-list-item
              button
              v-for="(item,index) in list"
              :key="index"
              @click="goArticlesDetails(item)"
            >
              <mu-list-item-title class="item">
                <span class="title">{{item.title}}</span>
                <span>{{item.createTime | filterDate}}</span>
              </mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-load-more>
        <Footer v-if="list.length >10"></Footer>
      </div>

      <mu-button v-show="!isPC" @click="$router.go(-1)" class="back-fab" small fab color="#fff">
        <mu-icon color="#ccc" value="arrow_back"></mu-icon>
      </mu-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RightConfig from "@/components/RightConfig";

export default {
  name: "categoriesDetails",
  components: {
    Header,
    Footer,
    RightConfig
  },
  data() {
    return {
      moreHeight: window.innerHeight - 64 + "px",
      page: 1,
      pageSize: this.isPC ? 10 : 15,
      list: [],
      info: {
        list: []
      },
      refreshing: false,
      loading: false,
      categoriesDetailBgImg: ""
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      this.$progress.start();
      const loading = this.$loading();

      const id = this.$route.query.id;
      const res = await this.$axios.get(
        `/categories/details?id=${id}&page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.info = res.data;
        const result = res.data.list;
        if (this.page === 1) {
          this.list = result;
        } else {
          this.list = this.list.concat(result);
        }
        this.categoriesDetailBgImg = this.info.categoriesDetailBgImg;
        this.$progress.done();
        loading.close();
      }
    },
    pageChange(page) {
      this.page = page;
      this.getInfo();
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 1;
        this.getInfo();
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.page += 1;
        this.getInfo();
      }, 2000);
    },
    goArticlesDetails(item) {
      this.$router.push({
        name: "articlesDetails",
        query: {
          id: item.id
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