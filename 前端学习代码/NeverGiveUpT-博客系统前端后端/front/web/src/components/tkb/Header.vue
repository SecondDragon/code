<template>
  <div>
    <mu-appbar class="tkb-app-bar" color="primary">
      <mu-button v-if="back" icon slot="left" @click="$router.go(-1)">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>

      {{ title }}

      <!-- 搜索 -->
      <mu-button
        v-if="search"
        slot="right"
        @click="handleSearch"
        flat
        color="primary"
      >
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-button class="back-btn" @click="goArticles" fab small color="purple">
      <mu-icon value="home"></mu-icon>
    </mu-button>

    <mu-dialog transition="slide-bottom" fullscreen :open.sync="openFullscreen">
      <mu-button style="float: right" icon @click="openFullscreen = false">
        <mu-icon value="close"></mu-icon>
      </mu-button>

      <mu-text-field icon="search" v-model="keyword" full-width>
        <mu-button @click="submitSearch" slot="append" flat color="primary"
          >搜索</mu-button
        >
      </mu-text-field>
      <div style="padding: 24px">
        <mu-chip
          class="search-chip"
          @click="keyword = item.keyword"
          v-for="item in searchHistoryList"
          :key="item.keyword"
          >{{ item.keyword }}</mu-chip
        >
        <mu-chip @click="clearChip" v-if="searchHistoryList.length != 0"
          >清除</mu-chip
        >
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    search: {
      type: Boolean,
      default: true,
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      openFullscreen: false,
      searchHistoryList: [],
      keyword: "",
    };
  },
  methods: {
    goArticles() {
      this.$router.push({
        path: "/articles",
      });
    },
    clearChip() {
      this.searchHistoryList = [];
      localStorage.setItem("searchHistory", "");
    },
    handleSearch() {
      this.openFullscreen = true;
      let old = [];
      const oldArrStr = localStorage.getItem("searchHistory");
      if (oldArrStr) {
        old = JSON.parse(oldArrStr);
      }
      this.searchHistoryList = old;
    },
    submitSearch() {
      if (!this.keyword) return;
      const item = { keyword: this.keyword, type: "TITLE" };
      let old = [];
      const oldArrStr = localStorage.getItem("searchHistory");
      if (oldArrStr) {
        old = JSON.parse(oldArrStr);
      }
      if (!old.map((item) => item.keyword).includes(this.keyword)) {
        old.push(item);
      }
      localStorage.setItem("searchHistory", JSON.stringify(old));
      this.$emit("search", this.keyword);
      this.resetSearch();
    },
    resetSearch() {
      this.openFullscreen = false;
      this.keyword = "";
    },
  },
};
</script>
<style lang="less" scoped>
// tkb样式
.tkb-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}
.search-chip {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.back-btn {
  position: fixed;
  bottom: 2rem;
  right: 0.4rem;
  z-index: 999;
}
</style>