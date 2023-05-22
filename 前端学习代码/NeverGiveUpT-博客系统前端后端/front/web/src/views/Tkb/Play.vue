<template>
  <div class="play">
    <tkb-header title="视频播放" :search="false"></tkb-header>

    <video
      v-show="showVideo"
      class="video"
      ref="myPlayer"
      controls
      crossorigin
      playsinline
      :poster="baseInfo.imgUrl"
    ></video>
    <div class="author">
      <span>
        <mu-icon
          color="primary"
          class="eye"
          :size="16"
          value="remove_red_eye"
        ></mu-icon>
        {{ baseInfo.playCount | filterPlayCount }}
      </span>
      <span>
        <mu-icon color="pink" class="eye" :size="16" value="thumb_up"></mu-icon>
        {{ baseInfo.praise }}
      </span>
      <span>
        <mu-icon
          color="blue"
          class="eye"
          :size="16"
          value="thumb_down"
        ></mu-icon>
        {{ baseInfo.degrade }}
      </span>
      <span
        ><mu-button @click="openDrawer = true" flat color="info"
          >详细信息</mu-button
        ></span
      >
    </div>

    <mu-drawer :open.sync="openDrawer" :docked="false">
      <div class="item">
        <span class="label">女优：</span>
        <div class="value">
          {{ baseInfo.starName }}
        </div>
      </div>

      <div class="item">
        <span class="label">简介：</span>
        <div class="value">
          {{ baseInfo.title }}
        </div>
      </div>

      <div class="item">
        <span class="label">番号：</span>
        <div class="value">
          {{ baseInfo.designation }}
        </div>
      </div>

      <div class="item">
        <span class="label">添加时间：</span>
        <div class="value">
          {{ baseInfo.createTime | filterDate }}
        </div>
      </div>

      <div class="item">
        <span class="label">分类：</span>
        <div class="value">
          <span v-for="item in baseInfo.categorySet" :key="item.id">{{
            item.name
          }}</span>
        </div>
      </div>

      <div class="item">
        <span class="label">标签：</span>
        <div class="value">
          <mu-chip
            :color="item.color"
            v-for="item in labelSet"
            :key="item.id"
            >{{ item.name }}</mu-chip
          >
        </div>
      </div>
    </mu-drawer>

    <mu-sub-header>相似推荐</mu-sub-header>
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
        <mu-button round color="primary" @click="goPlay(item)">播放</mu-button>
        <mu-button round color="error" @click="handlePreview(item)">{{
          item.preview ? "取消" : "预览"
        }}</mu-button>
      </div>
    </mu-card>

    <div v-if="total > pageSize" class="pagination">
      <mu-button @click="handleMore" color="primary">查看更多</mu-button>
    </div>
  </div>
</template>
<script>
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

import TkbHeader from "@/components/tkb/Header";
import { randomColor, createMd5 } from "@/utils";
export default {
  name: "play",
  components: {
    TkbHeader,
  },
  computed: {
    labelSet() {
      return this.baseInfo.labelSet?.map((item) => {
        item.color = randomColor();
        return item;
      });
    },
  },
  data() {
    return {
      baseInfo: {},
      openDrawer: false,
      showVideo: false,
      page: 1,
      pageSize: 8,
      total: 0,
      list: [],
    };
  },
  mounted() {
    this.getVideoInfo();
  },
  methods: {
    async getVideoInfo(query) {
      if (!query) {
        query = this.$route.query;
      }
      const res = await this.$axios.get(
        `/tkb/v/get?batch=${query.batch}&url=${query.url}`
      );
      if (res.data) {
        this.baseInfo = res.data;
        this.initPlayer(this.baseInfo);
        this.getSimilarList();
      }
    },
    initPlayer(data) {
      const player = new Plyr(this.$refs.myPlayer, {
        captions: {
          active: !0,
          update: !0,
          language: "auto",
        },
      });
      const url = this.getUrl(data);
      window.player = player;
      if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(this.$refs.myPlayer);
      } else {
        this.$refs.myPlayer.src = url;
      }
      this.showVideo = true;
    },
    getUrl(data) {
      let base = `${data.batch}/${data.url}/output_sd.m3u8`;
      if (data.hd) {
        base = `${data.batch}/${data.url}/output_hd.m3u8`;
      }
      let word = `${data.tkbSlat}/${base}${data.t}`;
      let md5 = createMd5(data.tkbCryptoKey, word);
      let url = `${data.tkbResources}/${base}?md5=${md5}&expires=${data.t}`;
      return url;
    },
    async getSimilarList() {
      const res = await this.$axios.get(
        `/tkb/v/list/similar?batch=${this.baseInfo.batch}&url=${
          this.baseInfo.url
        }&page=${this.page - 1}&pageSize=${this.pageSize}`
      );
      if (res.data) {
        this.total = res.data.total;
        const result = res.data.content;
        console.log(this.page);
        if (this.page === 1) {
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
      this.$router.replace({
        name: "play",
        query: {
          batch: item.batch,
          url: item.url,
        },
      });
    },
    handleMore() {
      this.page++;
      this.getSimilarList();
    },
  },

  beforeRouteUpdate(to, from, next) {
    if (to.query.batch != from.query.batch) {
      this.list = [];
      this.page = 1;
      this.total = 0;
      this.getVideoInfo(to.query);
    }
    next();
  },
};
</script>
<style lang="less" scoped>
.play {
  padding: 60px 0 0;

  .mu-card-header-title {
    padding-right: 0;
  }
  .item {
    display: flex;
    padding: 5px 16px;
    .label {
      flex: 2;
    }
    .value {
      flex: 5;
      span {
        margin: 0 0.2rem 0.2rem 0;
      }
    }
  }
}
.video {
  width: 100%;
  height: 300px;
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 16px;
  span {
    display: flex;
    align-items: center;
  }
}
.load-more {
  padding: 0 0.3rem;
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
.pagination {
  margin: 0.53333rem 0;
  display: flex;
  justify-content: center;
}
</style>