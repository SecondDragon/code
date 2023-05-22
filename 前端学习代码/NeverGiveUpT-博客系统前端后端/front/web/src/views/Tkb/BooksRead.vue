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
    <mu-sub-header
      v-if="baseInfo.chapters && baseInfo.chapters.length === 1"
      class="sub-header"
      >{{ chapter.name }}</mu-sub-header
    >
    <div class="content" v-html="content"></div>

    <div
      class="bottom"
      v-if="baseInfo.chapters && baseInfo.chapters.length > 1"
    >
      <mu-button @click="handleChange(-1)" color="primary" :disabled="current === 1">上一章</mu-button>
      <mu-button
        @click="handleChange(1)"
        v-if="baseInfo.chapters && baseInfo.chapters.length > 1"
        color="secondary"
        >下一章</mu-button
      >
    </div>
  </div>
</template>
<script>
import TkbHeader from "@/components/tkb/Header";

export default {
  name: "booksRead",
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
      baseInfo: {},
      content: "",
      chapter: {},
      current: 1,
    };
  },
  mounted() {
    this.getNovelChapters();
  },
  methods: {
    async getNovelChapters() {
      const { batch } = this.$route.query;
      const res = await this.$axios.get(`/tkb/novel/chapters?batch=${batch}`);
      if (res.data) {
        this.baseInfo = res.data;
        this.getNovelContent();
      }
    },
    async getNovelContent() {
      const { batch } = this.$route.query;
      this.chapter =
        this.baseInfo.chapters && this.baseInfo.chapters[this.current - 1]
          ? this.baseInfo.chapters[this.current - 1]
          : "";
      const res = await this.$axios.get(
        `/tkb/novel?batch=${batch}&cbatch=${this.chapter.batch}`
      );
      if (res.data) {
        this.content = res.data;
      }
    },
    handleChange(val) {
      this.current += val;
      this.getNovelContent();
    },
  },
};
</script>
<style lang="less" scoped>
.mu-list {
  margin-top: 60px;
}

.content {
  padding: 0 0.3rem 2rem;
  line-height: 1.5;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  font-size: 0.5rem;
}
.sub-header {
  font-size: 0.5rem;
}
.bottom {
  position: fixed;
  bottom: 0.3rem;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>