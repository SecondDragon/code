# 第26节：文章详情-CommentList组件

![./comment.png](./comment.png)







## 1.新建components/CommentList.vue

```vue
<template>
  <div class="comment-list">
    <div class="comment-item">
      <mu-card
        class="card"
        :class="[classStyle, isPC ? '' : 'wap-card']"
        v-for="item in list"
        :key="item._id"
      >
        <mu-card-header
          :title="item.nickName"
          :sub-title="item.commentTime | filterDate"
        >
          <mu-avatar slot="avatar">
            <img :src="item.avatar" />
          </mu-avatar>
        </mu-card-header>
        <mu-card-text>
          <span v-if="prevWho" class="who">@{{ prevWho }}</span>
          {{ item.currentReplayContent }}
          <mu-badge
            v-if="item.auditStatus == 3"
            content="未审核"
            color="#ccc"
          ></mu-badge>
        </mu-card-text>

        <mu-card-actions
          v-if="
            user && user.nickName !== item.nickName && user.email !== item.email
          "
        >
          <mu-button @click="replay(item)" small color="primary"
            >回复</mu-button
          >
        </mu-card-actions>

        <!-- 递归组件 调用自身，必须指定name属性commentList -->
        <div v-if="item.children">
          <comment-list
            :prevWho="item.nickName"
            classStyle="sub-card"
            :articleId="articleId"
            :articleTitle="articleTitle"
            :list="item.children"
          ></comment-list>
        </div>
      </mu-card>
    </div>

    <mu-dialog
      :title="modalTitle"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-text-field
        v-model="replayContent"
        class="comment-input"
        placeholder="说点什么..."
        multi-line
        :rows="4"
        full-width
      ></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="close"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="ok"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: "commentList",
  props: {
    list: {
      type: Array,
      default: () => {},
    },
    articleId: {
      type: String,
      default: "",
    },
    articleTitle: {
      type: String,
      default: "",
    },
    classStyle: {
      type: String,
      default: "",
    },
    prevWho: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false,
      replayContent: "",
      modalTitle: "",
      user: JSON.parse(localStorage.getItem("user")),
      showList: [],
      replayItem: {},
    };
  },
  methods: {
    replay(item) {
      if (!this.user) {
        this.$toast.info("登录才能回复");
        return;
      }
      this.open = true;
      this.modalTitle = `回复 @${item.nickName}`;
      this.replayItem = item;
    },
    close() {
      this.open = false;
      this.replayContent = "";
    },
    ok() {
      if (!this.replayContent) {
        this.$toast.info("请输入回复内容");
        return;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.comment-item {
  padding-bottom: 0.53333rem;
  /deep/ .mu-card-text {
    padding-top: 0;
    .who {
      color: #e91e63;
    }
  }
}
.card {
  margin: 0.42667rem 1.06667rem 0 1.06667rem;
  padding-bottom: 0.42667rem;
  box-shadow: none;
  border-radius: 0;
}
.wap-card {
  margin: 4px 10px 0 10px;
}
.sub-card {
  border-left: 1px dashed #00e676;
  border-bottom: 1px dashed #00e676;
  box-shadow: none;
  border-radius: 0;
}
</style>
```



## 2.Articles/Details.vue使用

```js
import CommentList from "@/components/CommentList";
```

局部注册

```js
export default {
  name: "articlesDetails",
  components: {
  	// ...
    CommentList,
  },
  // ...
  data(){
    return {
			// ...
       info: {
        _id: "601134b4c4ae0128013d322d",
        title: "使用jspdf+canvas2html将网页保存为pdf文件",
        introduction: "简介",
        cover: "http://nevergiveupt.top/canvas/html2canvas.png",
      },
      prev: {},
      next: {},
      content: "",
      toc: [],
      commentSuccess: false,
      commentList: [
        {
          targetReplayId: "6084ce48e268db458626591a",
          targetReplayContent: "good",
          currentReplayContent: "这篇文章写得不错",
          commentTime: 1623048202,
          auditTime: 0,
          auditStatus: "3",
          _id: "60bdc00ac4b76ef12cd151aa",
          avatar: "http://www.nevergiveupt.top/user_avatar.png",
          email: "13412345678@163.com",
          nickName: "Never",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "good",
          commentTime: 1619316296,
          auditTime: 1619316309,
          auditStatus: "1",
          _id: "6084ce48e268db458626591a",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1916579055@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "好，不错",
          commentTime: 1611745373,
          auditTime: 1612108800,
          auditStatus: "1",
          _id: "6011485dc4ae0128013d3246",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1916579055@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
      ],
      // ...
    }
  }
}
```



## 3.页面使用

```vue
 <mu-card id="comment" class="card">
            <Comment
              @comment="comment"
              :comment-success="commentSuccess"
            ></Comment>
          </mu-card>

          <mu-card class="card" v-if="commentList.length > 0">
            <mu-card-title title="评论（3）"></mu-card-title>
            <mu-divider></mu-divider>
            <CommentList
              v-if="commentList.length > 0"
              :articleId="info._id"
              :articleTitle="info.title"
              :list="commentList"
            ></CommentList>
          </mu-card>
```



mounted调用

```js
this.commentList = this.listToTree(this.commentList);
```

methods定义`listToTree`方法

```js
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
```

![](./commentList.png)

listToTree方法就是将上面的列表结构转换成树形结构

![commentListTree.png](./commentListTree.png)





完整代码：

Articles/Details.vue

```vue
<template>
  <div class="details">
    <Header :light-index="1"></Header>

    <div v-if="isPC" class="toc-fixed">
      <mu-card class="card">
        <div class="toc">
          <div class="title">文章目录</div>
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>
      <div class="action" :class="toc.length > 0 ? '' : 'noMulu'">
        <mu-tooltip placement="top" content="点赞">
          <mu-button fab color="primary">
            <mu-icon value="thumb_up"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="收藏">
          <mu-button fab color="purple500">
            <mu-icon value="grade"></mu-icon>
          </mu-button>
        </mu-tooltip>

        <mu-tooltip placement="top" content="评论">
          <mu-button fab color="red">
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
              <mu-button class="cursor-default" flat color="warning"
                >字数(1000)</mu-button
              >
              <mu-button class="cursor-default" flat color="secondary"
                >阅读大约2分钟</mu-button
              >
              <mu-button class="cursor-default" flat color="info"
                >查看(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="error"
                >评论(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >点赞(100)</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e"
                >2021-05-20 13:14</mu-button
              >
            </mu-card-actions>
            <mavonEditor
              v-model="content"
              :ishljs="true"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
              codeStyle="tomorrow-night-eighties"
              :navigation="isPC"
            />

            <mu-card-actions>
              <mu-button class="cursor-default" flat color="primary">
                <mu-icon left value="dns"></mu-icon>
                分类
              </mu-button>

              <mu-button class="cursor-default" flat>
                <mu-icon left value="loyalty"></mu-icon>
                标签1
              </mu-button>
              <mu-button class="cursor-default" flat>
                <mu-icon left value="loyalty"></mu-icon>
                标签2
              </mu-button>
            </mu-card-actions>
          </mu-card>

          <div class="action-list">
            <mu-tooltip placement="top" content="点赞">
              <mu-button fab color="primary">
                <mu-icon value="thumb_up"></mu-icon>
              </mu-button>
            </mu-tooltip>

            <mu-tooltip placement="top" content="收藏">
              <mu-button fab color="purple500">
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
            <mu-card-title title="评论（3）"></mu-card-title>
            <mu-divider></mu-divider>
            <CommentList
              v-if="commentList.length > 0"
              :articleId="info._id"
              :articleTitle="info.title"
              :list="commentList"
            ></CommentList>
          </mu-card>

          
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
    Footer,
    Header,
    mavonEditor,
    CommentList,
  },
  data() {
    return {
      info: {
        _id: "601134b4c4ae0128013d322d",
        title: "使用jspdf+canvas2html将网页保存为pdf文件",
        introduction: "简介",
        cover: "http://nevergiveupt.top/canvas/html2canvas.png",
      },
      prev: {},
      next: {},
      content: "",
      toc: [],
      commentSuccess: false,
      commentList: [
        {
          targetReplayId: "6084ce48e268db458626591a",
          targetReplayContent: "good",
          currentReplayContent: "这篇文章写得不错",
          commentTime: 1623048202,
          auditTime: 0,
          auditStatus: "3",
          _id: "60bdc00ac4b76ef12cd151aa",
          avatar: "http://www.nevergiveupt.top/user_avatar.png",
          email: "13412345678@163.com",
          nickName: "Never",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "good",
          commentTime: 1619316296,
          auditTime: 1619316309,
          auditStatus: "1",
          _id: "6084ce48e268db458626591a",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1912324677@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
        {
          targetReplayId: "",
          targetReplayContent: "",
          currentReplayContent: "好，不错",
          commentTime: 1611745373,
          auditTime: 1612108800,
          auditStatus: "1",
          _id: "6011485dc4ae0128013d3246",
          avatar:
            "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
          email: "1912324677@qq.com",
          nickName: "永不放弃",
          articleId: "601134b4c4ae0128013d322d",
          articleTitle: "测试评论文章",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.content = markdown(
      mavonEditor,
      "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n```"
    );

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

    this.$nextTick(() => {
      let clipboard = new Clipboard(".copy-btn");
      // 复制成功失败的提示
      clipboard.on("success", () => {
        this.$toast.success("复制成功");
      });
      clipboard.on("error", () => {
        this.$toast.error("复制失败");
      });
    });

    this.commentList = this.listToTree(this.commentList);
  },
  methods: {
    scrollToPosition(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 1000);
    },
    async comment(data) {
      console.log("评论数据", data);
      this.commentSuccess = true;
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
```

