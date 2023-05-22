<template>
  <div>
    <tkb-header title="明星" @search="search" :back="false"></tkb-header>
    <tkb-filter @onFilter="onFilter" fil="stars"></tkb-filter>
    <tkb-footer shift="stars"></tkb-footer>

    <!-- 无数据 -->
    <div v-if="list && list.length === 0" class="no-data">
      <img :src="noData" alt="" />
    </div>

    <!-- 列表 -->
    <mu-load-more
      class="load-more"
      @refresh="refresh"
      :refreshing="refreshing"
      :loading="loading"
      @load="load"
    >
      <mu-row gutter>
        <mu-col
          @click="goStarsInfo(item)"
          class="item"
          span="6"
          v-for="item in list"
          :key="item.url"
        >
          <mu-paper :z-depth="5">
            <img :src="item.imgUrl" />
            <div class="title">{{ item.name }}</div>
            <div class="sub">
              <p>
                <mu-icon
                  color="primary"
                  class="eye"
                  :size="16"
                  value="remove_red_eye"
                ></mu-icon>
                {{ item.playCount | filterPlayCount }}
              </p>
              <p>{{ item.films }}部</p>
            </div>
          </mu-paper>
        </mu-col>
      </mu-row>
    </mu-load-more>
  </div>
</template>
<script>
import TkbHeader from "@/components/tkb/Header";
import TkbFooter from "@/components/tkb/Footer";
import TkbFilter from "@/components/tkb/Filter";

export default {
  name: "stars",
  components: {
    TkbHeader,
    TkbFooter,
    TkbFilter,
  },
  data() {
    return {
      list: null,
      refreshing: false,
      loading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      recommendType: "",
      categoryId: "",
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    search(keyword) {
      this.getList(keyword);
    },
    onFilter(field, id) {
      this[field] = id;
      this.page = 0;
      this.list = null;
      this.getList();
    },
    async getList(keyword) {
      this.$progress.start();
      let url = `/tkb/star/list?braSize=${this.recommendType}&page=${this.page}&pageSize=${this.pageSize}&category=${this.categoryId}`;
      if (keyword) {
        url += `&title=${keyword}`;
      }

      const res = await this.$axios.get(url);

      if (res.data) {
        this.total = res.data.total;
        const result = res.data.content;
        if (this.page === 0) {
          this.list = result;
        } else {
          this.list = this.list.concat(result);
        }
        this.$progress.done();
      }
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 0;
        this.getList();
      }, 2000);
    },
    load() {
      if (this.page * this.pageSize <= this.total) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.page += 1;
          this.getList();
        }, 2000);
      }
    },
    goStarsInfo(item) {
      this.$router.push({
        name: "starsInfo",
        query: {
          name: item.name,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.load-more {
  padding-top: 100px;
  padding-bottom: 60px;
  .item {
    margin-bottom: 20px;
    cursor: pointer;
    .sub {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        display: flex;
        align-items: center;
        .eye {
          margin-right: 4px;
        }
      }
    }
    .title {
      padding: 0 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>