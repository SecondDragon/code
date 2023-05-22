# 第 22节：RightConfig组件

## 1.components下新建 RightConfig.vue

```vue
<template>
  <div class="right-config">
    <mu-card class="slider-card">
      <mu-avatar class="avatar" size="100">
        <img v-lazy="avatar" alt />
      </mu-avatar>
      <div class="title">NeverGiveUpT</div>
      <div class="desc">专注于WEB和移动前端开发</div>
      <div class="tags">
        <mu-chip class="chip">Vue</mu-chip>
        <mu-chip class="chip">React</mu-chip>
        <mu-chip class="chip">4年开发经验</mu-chip>
      </div>
      <div class="friend-link-box">
        <p class="friend-link-title">友情链接</p>
        <div class="friend-links">
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/github.png" alt />
            </mu-avatar>
          </mu-button>
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/sf.jpeg" alt />
            </mu-avatar>
          </mu-button>
          <mu-button fab small>
            <mu-avatar size="40">
              <img src="http://www.nevergiveupt.top/zhihu.jpg" alt />
            </mu-avatar>
          </mu-button>
        </div>
      </div>
    </mu-card>

    <mu-card class="slider-card card-ad">
      <div class="ad">广告</div>
      <mu-carousel style="height: 120px" hide-controls>
        <mu-carousel-item>
          <img
            style="width: 100%; cursor: pointer"
            src="https://img.alicdn.com/tfs/TB1v0eeB4z1gK0jSZSgXXavwpXa-2880-574.png"
          />
        </mu-carousel-item>
      </mu-carousel>
    </mu-card>

    <mu-card class="slider-card">
      <div class="friend-link-box">
        <p class="friend-link-title">电影推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">唐人街探案3</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">电视剧推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">赘婿</mu-chip>
          </div>
        </div>
      </div>

      <div class="friend-link-box">
        <p class="friend-link-title">音乐推荐</p>
        <div class="friend-links">
          <div class="tags">
            <mu-chip class="chip">半生雪</mu-chip>
          </div>
        </div>
      </div>
    </mu-card>

    <mu-card class="slider-card card-ad">
      <img src="http://www.nevergiveupt.top/qianduanxiaokezhan.png" alt="" />
    </mu-card>
  </div>
</template>
<script>
export default {
  props: {
    showPosition: {
      type: String,
    },
  },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.right-config {
  width: 4rem;
}
.slider-card {
  position: relative;
  margin-top: 16px;
  text-align: center;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
  .avatar {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
      0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
  .title {
    font-size: 20px;
    color: #00e676;
  }
  .desc {
    font-size: 14px;
    margin: 10px 0;
  }
  .tags {
    .chip {
      margin: 0 10px 10px 0;
    }
  }
  .friend-link-box {
    .friend-link-title {
      position: relative;
      &::before {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ccc;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .friend-links {
      display: flex;
      justify-content: space-around;
    }
  }
  .ad {
    position: absolute;
    z-index: 1;
    right: 8px;
    top: 8px;
    font-size: 12px;
  }
}
.card-ad {
  padding: 8px;
}
</style>
```

## 2.views/Articles/Index.vue使用

```vue
<template>
  <div class="articles">
    <Header :light-index="1"></Header>
    <div class="content">
      <div v-if="isPC" class="right">
        <RightConfig showPosition="文章"></RightConfig>
      </div>
      <div :class="[{ 'wap-left': !isPC }, 'left']">
        <mu-card class="card">
          <div v-if="isPC" class="cover">
            <img
              class="cover-img"
              src="http://nevergiveupt.top/canvas/html2canvas.png"
            />
          </div>
          <div class="card-box">
            <div class="title">使用jspdf+canvas2html将网页保存为pdf文件</div>
            <mu-card-actions class="sub-title">
              <mu-button class="cursor-default" flat color="info"
                >查看(10)</mu-button
              >
              <mu-button class="cursor-default" flat color="error"
                >评论(0)</mu-button
              >
              <mu-button class="cursor-default" flat color="primary"
                >点赞(20)</mu-button
              >
              <mu-button class="cursor-default" flat color="#9e9e9e"
                >2021-02-04 09:57</mu-button
              >
            </mu-card-actions>
            <mu-card-text class="text">简介</mu-card-text>
            <mu-card-actions>
              <mu-button flat class="chip cursor-default" color="primary">
                <mu-icon left value="dns"></mu-icon>
                分类
              </mu-button>

              <mu-button flat class="chip cursor-default">
                <mu-icon left value="loyalty"></mu-icon>
                标签1
              </mu-button>
              <mu-button flat class="chip cursor-default">
                <mu-icon left value="loyalty"></mu-icon>
                标签2
              </mu-button>
            </mu-card-actions>
          </div>
        </mu-card>
      </div>
    </div>

    <div v-if="info.totalCount > pageSize" class="pagination">
      <mu-pagination
        raised
        circle
        :total="info.totalCount"
        :current.sync="page"
        :pageSize.sync="pageSize"
        :pageCount="5"
        @change="pageChange"
      ></mu-pagination>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default {
  name: "articles",
  components: {
    RightConfig,
    Footer,
    Header,
  },

  data() {
    return {
      page: 1,
      pageSize: 10,
      info: {
        page: 1,
        pageSize: 10,
        totalCount: 50,
        list: [
          {
            categories: "技术",
            collect: 0,
            comment: 0,
            content: "123",
            cover: "http://nevergiveupt.top/canvas/html2canvas.png",
            createTime: 1612403820,
            introduction:
              "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
            isCollect: true,
            isComment: true,
            isLike: true,
            isReward: false,
            like: 0,
            publishStatus: 1,
            sort: 0,
            status: 1,
            tags: ["Canvas", "Pdf.js"],
            title: "使用jspdf+canvas2html将网页保存为pdf文件",
            updateTime: 1612416421,
            views: 9,
            _id: "601b546ce268db458626529c",
          },
          {
            categories: "生活",
            collect: 0,
            comment: 0,
            content: "123",
            cover: "http://nevergiveupt.top/canvas/html2canvas.png",
            createTime: 1612403820,
            introduction:
              "有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。",
            isCollect: true,
            isComment: true,
            isLike: true,
            isReward: false,
            like: 0,
            publishStatus: 1,
            sort: 0,
            status: 1,
            tags: ["Canvas", "Pdf.js"],
            title: "使用jspdf+canvas2html将网页保存为pdf文件",
            updateTime: 1612416421,
            views: 9,
            _id: "601b546ce268db458626529c",
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.articles {
  padding-top: 64px;
  .content {
    padding-bottom: 0.53333rem;
    display: flex;
    .left {
      flex: 9;
      &.wap-left {
        .card {
          float: none;
          width: 90%;
        }
      }
      .card {
        width: 80%;
        float: left;
        margin: 0.42667rem auto 0;
        display: flex;
        flex-wrap: wrap;
        border-radius: 5px;
        &:hover {
          animation: pulse 1s;
        }
        .title {
          padding: 0.42667rem 0.42667rem 0 0.42667rem;
          font-size: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          cursor: pointer;
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

  .box {
    justify-content: center !important;
    padding-bottom: 0.53333rem;
  }
}

.pagination {
  margin: 0.53333rem 0;
  display: flex;
  justify-content: center;
}
</style>
```

