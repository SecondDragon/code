<template>
  <div class="details">
    <Header :light-index="1"></Header>

    <div v-if="isPC" class="toc-fixed">
      <mu-card v-if="toc.length > 0" class="card">
        <div class="toc">
          <div class="title">文章目录</div>
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>
      <div class="action" :class="toc.length > 0 ? '' : 'noMulu'">
        <mu-tooltip v-if="info.isLike" placement="top" content="点赞">
          <mu-button @click="like" fab color="primary">
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip v-if="info.isCollect" placement="top" content="收藏">
          <mu-button @click="collect" fab color="purple500">
            <mu-icon value="grade"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip v-if="info.isComment" placement="top" content="评论">
          <mu-button @click="scrollComment" fab color="red">
            <mu-icon value="chat"></mu-icon>
          </mu-button>
        </mu-tooltip>
      </div>
    </div>

    <div class="content">
      <div v-if="isPC" class="right">
        <RightConfig showPosition="文章详情"></RightConfig>
      </div>
      <div class="left" :style="{ marginTop: isPC ? '16px' : 0 }">
        <div class="left-box" :style="{ width: isPC ? '70%' : '100%' }">
          <mu-card class="card">
            <mu-card-title
              :title="info.title"
              :sub-title="info.introduction"
            ></mu-card-title>
            <mu-card-media :style="{ height: isPC ? '400px' : 'auto' }">
              <img v-lazy="info.cover" style="height: 100%" />
            </mu-card-media>
            <mu-card-actions class="sub-title">
              <mu-button
                class="cursor-default"
                v-if="wordLength > 0"
                flat
                color="warning"
                >字数({{ wordLength }})</mu-button
              >
              <mu-button
                class="cursor-default"
                v-if="min > 0"
                flat
                color="secondary"
                >阅读大约{{ min }}分钟</mu-button
              >
              <mu-button class="cursor-default" flat color="info"
                >查看({{ info.views }})</mu-button
              >
              <mu-button class="cursor-default" flat color="error"
                >评论({{ info.comment }})</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >点赞({{ info.like }})</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e">{{
                info.createTime | filterDate
              }}</mu-button>
            </mu-card-actions>

            <mavonEditor
              v-model="content"
              :ishljs="true"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
              codeStyle="tomorrow-night-eighties"
              :navigation="isPC"
              :externalLink="externalLink"
            />

            <mu-card-actions>
              <mu-button class="cursor-default" flat color="primary">
                <mu-icon left value="dns"></mu-icon>
                {{ info.categories }}
              </mu-button>

              <mu-button
                class="cursor-default"
                flat
                v-for="sub in info.tags"
                :key="sub"
              >
                <mu-icon left value="loyalty"></mu-icon>
                {{ sub }}
              </mu-button>
            </mu-card-actions>
          </mu-card>

          <div class="action-list">
            <mu-tooltip v-if="info.isLike" placement="top" content="点赞">
              <mu-button @click="like" fab color="primary">
                <mu-icon value="thumb_up"></mu-icon>
              </mu-button>
            </mu-tooltip>

            <mu-tooltip v-if="info.isCollect" placement="top" content="收藏">
              <mu-button @click="collect" fab color="purple500">
                <mu-icon value="grade"></mu-icon>
              </mu-button>
            </mu-tooltip>
          </div>

          <mu-card id="comment" class="card">
            <Comment
              @comment="comment"
              :comment-success="commentSuccess"
            ></Comment>
          </mu-card>

          <mu-card class="card" v-if="commentList.length > 0">
            <mu-card-title :title="commentTitle"></mu-card-title>
            <mu-divider></mu-divider>
            <CommentList
              v-if="commentList.length > 0"
              :articleId="info._id"
              :articleTitle="info.title"
              :list="commentList"
            ></CommentList>
          </mu-card>

          <prev-next :prev="prev" :next="next"></prev-next>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import Comment from "@/components/Comment";
import CommentList from "@/components/CommentList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PrevNext from "@/components/PrevNext";

// import { animateScroll } from "@/utils";
import Clipboard from "clipboard";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { markdown } from "@/utils/markdown";
import $ from "jquery";

export default {
  name: "articlesDetails",
  components: {
    RightConfig,
    Comment,
    CommentList,
    Footer,
    Header,
    PrevNext,
    mavonEditor,
  },
  data() {
    return {
      info: {},
      prev: {},
      next: {},
      content: "",
      toc: [],
      commentSuccess: false,
      commentList: [],
      externalLink: {
        markdown_css: function () {
          // 这是你的markdown css文件路径
          return "/markdown/github-markdown.min.css";
        },
        hljs_js: function () {
          // 这是你的hljs文件路径
          return "/highlightjs/highlight.min.js";
        },
        hljs_css: function (css) {
          // 这是你的代码高亮配色文件路径----没生效--直接把tomorrow-night-eighties.min.css放到了src/assets/iconfont下
          return "/highlightjs/styles/" + css + ".min.css";
        },
        hljs_lang: function (lang) {
          // 这是你的代码高亮语言解析路径----没生效
          return "/highlightjs/languages/" + lang + ".min.js";
        },
        katex_css: function () {
          // 这是你的katex配色方案路径路径
          return "/katex/katex.min.css";
        },
        katex_js: function () {
          // 这是你的katex.js路径
          return "/katex/katex.min.js";
        },
      },
    };
  },
  computed: {
    min() {
      if (this.content) {
        return Math.floor(this.info.content.length / 1000);
      }
      return 0;
    },
    wordLength() {
      if (this.info.content) {
        var lenE = this.info.content.length;
        var enter = this.info.content.match(/\r\n/g);
        return enter === null ? lenE : lenE - enter.length;
      }
      return 0;
    },
    commentTitle() {
      return this.info.comment ? `评论（${this.info.comment}）` : null;
    },
  },
  mounted() {
    const id = this.$route.query.id;
    this.getInfo(id, 1);
    this.getCommentList(id);

    this.$nextTick(() => {
      this.clipboard = new Clipboard(".copy-btn");
      // 复制成功失败的提示
      this.clipboard.on("success", () => {
        this.$toast.success("复制成功");
      });
      this.clipboard.on("error", () => {
        this.$toast.error("复制失败");
      });
    });
  },
  methods: {
    /**
     * views 统计预览次数，这里统计第一次进入页面的次数
     */
    async getInfo(id, views) {
      this.$progress.start();
      const loading = this.$loading();
      const res = await this.$axios.get(
        `/articles/details?id=${id}&views=${views}`
      );
      if (res.data) {
        this.info = res.data.current;
        this.prev = res.data.prev;
        this.next = res.data.next;
        this.content = markdown(mavonEditor, this.info.content);

        this.$progress.done();
        loading.close();
        this.$nextTick(() => {
          const aArr = $(
            ".v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a"
          ).toArray();
          let toc = [];
          aArr.forEach((item) => {
            let href = $(item).attr("id");
            let name = $(item).parent().text();
            if (href) {
              toc.push({
                href: "#" + href,
                name,
              });
            }
          });
          this.toc = toc;
        });
      }
    },
    scrollToPosition(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 1000);
    },

    async getCommentList(id) {
      const res = await this.$axios.get(`/comment/list?articleId=${id}`);
      if (res.data) {
        this.commentList = this.listToTree(res.data);
      }
    },

    listToTree(list) {
      let info = list.reduce(
        (map, node) => ((map[node._id] = node), (node.children = []), map),
        {}
      );
      return list.filter((node) => {
        info[node.targetReplayId] &&
          info[node.targetReplayId].children.push(node);
        return !node.targetReplayId;
      });
    },

    scrollComment() {
      // let target = document.getElementById("comment");
      // animateScroll(target, 500, -50);
      this.scrollToPosition("#comment");
    },
    async comment(data) {
      const postData = {
        avatar: data.avatar,
        email: data.email,
        nickName: data.nickName,
        articleId: this.info._id,
        articleTitle: this.info.title,
        currentReplayContent: data.content,
      };
      const res = await this.$axios.post("/comment", postData);
      if (res.data) {
        this.$toast.success(res.msg);
        this.commentSuccess = true;
        location.reload();
      }
    },
    async like() {
      const oldLikeArr = JSON.parse(sessionStorage.getItem("like"));
      if (oldLikeArr) {
        const isliked = oldLikeArr.some((item) => item === this.info._id);
        if (isliked) {
          this.$toast.info("您已经点赞了！");
          return;
        }
      }

      const postData = {
        articleId: this.info._id,
      };
      const res = await this.$axios.post("/like", postData);
      if (res.data) {
        this.$toast.success(res.msg);
        const oldLikeArr = JSON.parse(sessionStorage.getItem("like"));
        let save = [postData.articleId];
        if (oldLikeArr) {
          save = [...oldLikeArr, postData.articleId];
        }
        sessionStorage.setItem("like", JSON.stringify(save));
      }
    },
    async collect() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return this.$toast.info("登录/注册后才能收藏哦");
      }
      const postData = {
        email: user.email,
        articleId: this.info._id,
      };
      const res = await this.$axios.post("/collect", postData);
      if (res.code === 0) {
        this.$toast.success(res.msg);
      } else {
        this.$toast.error(res.msg);
      }
    },
  },
  beforeRouteUpdate(to, from, next) {
    const id = to.query.id;
    this.getInfo(id, 1);
    this.getCommentList(id);
    next();
  },
};
</script>
<style lang="less" scoped>
.details {
  padding-top: 64px;
}

.toc-fixed {
  position: fixed;
  width: 20%;
  right: 20px;
  top: 80px;
  .toc {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    word-break: break-all;
    padding: 0.2rem 0 0.2rem 0.2rem;
    .title {
      font-size: 0.4rem;
      margin-bottom: 10px;
    }
    a {
      display: inline-block;
      color: #2196f3;
      font-size: 0.32rem;
      cursor: pointer;
      padding: 5px 0;
      &:hover {
        color: #00e676;
      }
    }
  }
}

.action-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.42667rem 0;
}
.action {
  margin-top: 0.42667rem;
  display: flex;
  justify-content: space-around;
}
.noMulu {
  flex-direction: column;
  align-items: center;
  height: 400px;
}

.content {
  padding-bottom: 0.53333rem;
  display: flex;
  .left {
    flex: 9;
    margin-top: 16px;
    .card {
      border-radius: 5px;
      margin-bottom: 0.48rem;
      .article-detail {
        width: 100%;
        padding: 0.42667rem 0.42667rem 0.42667rem 0.69333rem;
        box-sizing: border-box;
        word-break: break-all;
      }
      .sub-title {
        display: flex;
        flex-wrap: wrap;
      }
      .text {
        padding: 0 0.42667rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .chip {
        margin-right: 0.26667rem;
      }
      .cover {
        flex: 1;
        border-radius: 0;
        padding: 0.42667rem;
        .cover-img {
          object-fit: cover;
          width: 100%;
          height: 4.26667rem;
          vertical-align: middle;
        }
      }
      .card-box {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
  .right {
    flex: 3;
    display: flex;
    justify-content: center;
  }
}
</style>