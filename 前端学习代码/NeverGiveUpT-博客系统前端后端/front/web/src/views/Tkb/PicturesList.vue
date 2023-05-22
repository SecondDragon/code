<template>
  <div>
    <tkb-header :title="baseInfo.title" :search="false"></tkb-header>

    <mu-list class="mu-list" textline="two-line">
      <mu-list-item :ripple="false" button>
        <mu-list-item-content>
          <mu-list-item-sub-title
            >分类：{{ categoryStr }}
          </mu-list-item-sub-title>
          <mu-list-item-sub-title>
            观看：{{ baseInfo.playCount | filterPlayCount }}
          </mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-list-item-after-text>{{
            baseInfo.createTime | filterDate("YYYY-MM-DD")
          }}</mu-list-item-after-text>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>

    <mu-load-more
      class="load-more"
      @refresh="refresh"
      :refreshing="refreshing"
      :loading="loading"
      @load="load"
    >
      <mu-row gutter>
        <mu-col class="item" span="6" v-for="item in list" :key="item.imgUrl">
          <mu-paper :z-depth="5">
            <img :src="item.imgUrl" v-gallery="'imgs'" />
            <div class="title">{{ item.title }}</div>
            <div class="sub">
              <p>
                <mu-icon
                  class="eye"
                  :size="16"
                  value="remove_red_eye"
                ></mu-icon>
                {{ item.playCount | filterPlayCount }}
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
          </mu-paper>
        </mu-col>
      </mu-row>
    </mu-load-more>
  </div>
</template>
<script>
import TkbHeader from "@/components/tkb/Header";

export default {
  name: "picturesList",
  components: {
    TkbHeader,
  },
  computed: {
    categoryStr() {
      return this.baseInfo.categorySet?.map((item) => item.name).join();
    },
  },
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      page: 0,
      pageSize: 20,
      total: 0,
      baseInfo: {},
    };
  },
  mounted() {
    this.getImageList();
    this.getImageAlbum();
  },
  methods: {
    async getImageList() {
      this.$progress.start();
      const { batch, url } = this.$route.query;
      const res = await this.$axios.get(
        `/tkb/image/list?batch=${batch}&page=${this.page}&pageSize=${this.pageSize}&url=${url}`
      );
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
    async getImageAlbum() {
      const { batch, url } = this.$route.query;
      const res = await this.$axios.get(
        `/tkb/image/album?batch=${batch}&url=${url}`
      );
      if (res.data) {
        this.baseInfo = res.data;
      }
    },
    refresh() {
      this.refreshing = true;
      setTimeout(() => {
        this.refreshing = false;
        this.page = 0;
        this.getImageList();
      }, 2000);
    },
    load() {
      if (this.page * this.pageSize <= this.total) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.page += 1;
          this.getImageList();
        }, 2000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.mu-list {
  margin-top: 60px;
}
.load-more {
  padding-bottom: 20px;
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