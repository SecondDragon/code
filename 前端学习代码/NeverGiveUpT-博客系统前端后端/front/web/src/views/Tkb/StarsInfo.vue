<template>
  <div class="stars-info">
    <tkb-header title="简介和作品" :search="false"></tkb-header>
    <div class="cover">
      <img v-lazy="baseInfo.imgUrl" alt="" />
    </div>
    <mu-expansion-panel>
      <div slot="header">{{ baseInfo.name }}</div>
      {{ baseInfo.description }}
    </mu-expansion-panel>
    <mu-expansion-panel>
      <div slot="header">演艺经历</div>
      {{ baseInfo.experience }}
    </mu-expansion-panel>

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
            {{ parseInt((item.praise / (item.degrade + item.praise)) * 100) }}%
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
</template>
<script>
import TkbHeader from "@/components/tkb/Header";

export default {
  name: "starsInfo",
  components: {
    TkbHeader,
  },
  data() {
    return {
      baseInfo: {},
      refreshing: false,
      loading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.getIntroduction();
    this.getStarList();
  },
  methods: {
    async getIntroduction() {
      const { name } = this.$route.query;
      const res = await this.$axios.get(`/tkb/star/get?name=${name}`);
      if (res.data) {
        this.baseInfo = res.data;
      }
    },
    async getStarList() {
      const { name } = this.$route.query;
      const res = await this.$axios.get(
        `/tkb/v/list?star=${name}&page=${this.page}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.total = res.data.total;
        const result = res.data.content;
        if (this.page === 0) {
          this.list = result;
        } else {
          this.list = this.list.concat(result);
        }
      }
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
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 0;
        this.getStarList();
      }, 2000);
    },
    load() {
      if (this.page * this.pageSize <= this.total) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.page += 1;
          this.getStarList();
        }, 2000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.stars-info {
  padding: 0 0.3rem;
}
.cover {
  margin-top: 60px;
  margin-bottom: 0.2rem;
  img {
    width: 100%;
    object-fit: contain;
    height: 6rem;
  }
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