<template>
  <div>
    <tkb-header title="视频" @search="search" :back="false"></tkb-header>
    <tkb-filter @onFilter="onFilter" type="VIDEO"></tkb-filter>
    <tkb-footer shift="videos"></tkb-footer>
    <div class="videos">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
      >
        <mu-card class="card" v-for="item in list" :key="item.id">
          <mu-card-header :title="item.title"> </mu-card-header>
          <mu-card-media>
            <img v-show="!item.preview" v-lazy="item.imgUrl" />
            <video
              v-show="item.preview"
              style="width: 100%; height: 210px"
              :src="item.previewUrl"
              loop="loop"
              muted="muted"
              autoplay="autoplay"
            ></video>
          </mu-card-media>
          <div class="sub">
            <p>
              <mu-icon class="eye" :size="16" value="remove_red_eye"></mu-icon>
              {{ item.playCount | filterPlayCount }}
            </p>
            <p>
              {{ item.hd ? "HD" : "SD" }}
              {{ item.duration | filterDuration }}
            </p>
            <p>
              <mu-icon
                color="pink"
                class="eye"
                :size="16"
                value="thumb_up"
              ></mu-icon>
              {{
                parseInt((item.praise / (item.degrade + item.praise)) * 100)
              }}%
            </p>
          </div>
          <div class="action">
            <mu-button round color="primary" @click="goPlay(item)"
              >播放</mu-button
            >
            <mu-button round color="error" @click="handlePreview(item)">{{
              item.preview ? "取消" : "预览"
            }}</mu-button>
          </div>
        </mu-card>
      </mu-load-more>
    </div>
  </div>
</template>
<script>
import TkbHeader from "@/components/tkb/Header";
import TkbFooter from "@/components/tkb/Footer";
import TkbFilter from "@/components/tkb/Filter";

export default {
  name: "videos",
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
      labelId: "",
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
      let url = `/tkb/v/list?recommendType=${
        this.recommendType || "NEW"
      }&page=${this.page}&pageSize=${this.pageSize}`;

      if (this.categoryId) {
        url += `&categoryId=${this.categoryId}`;
      }
      if (this.labelId) {
        url += `&labelId=${this.labelId}`;
      }
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
    handlePreview(item) {
      if (item.preview === undefined) {
        this.$set(item, "preview", true);
      } else {
        item.preview = !item.preview;
      }
    },
    goPlay(item) {
      this.$router.push({
        name: "play",
        query: {
          batch: item.batch,
          url: item.url,
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.videos {
  padding: 100px 0.3rem 60px;
}
.card {
  margin-top: 0.5rem;
  .mu-card-header-title {
    padding-right: 0;
  }
  .action {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 0.3rem 0;
  }
}
.sub {
  padding: 0 16px;
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
</style>