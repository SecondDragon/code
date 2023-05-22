# 第 24节：文章详情-mavonEditor组件

我们的文章内容是通过md语法来书写的。所有前台这边选用[mavonEditor](https://github.com/hinesboy/mavonEditor/blob/master/README.md)来解析。

## 1.安装mavonEditor

```bash
$ npm install mavon-editor --save
```

## 2.引入

```js
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
```

局部注册：

```js
export default {
  name: "articlesDetails",
  components: {
  	// ...
    mavonEditor,
  },
  // ...
  data(){
    return {
            content: "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n```",
      info: {},
      prev: {},
      next: {},
      toc: [], // 目录
      commentSuccess: false,
      commentList: [],
    }
  }
}
```

## 3.页面使用

```vue
<mavonEditor
   v-model="content"
   :ishljs="true"
   :toolbarsFlag="false"
   :subfield="false"
   defaultOpen="preview"
   codeStyle="tomorrow-night-eighties"
   :navigation="isPC"
/>
```

[配置项文档](https://github.com/hinesboy/mavonEditor/blob/master/README.md)

## 4.隐藏默认的目录导航并自定义

global.less添加

```less
// 文章导航
.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition {
  display: none;
}
```

如何自定义？核科技-->`Jquery`

安装jquery

```bash
$ yarn add jquery
# OR
$ npm install jquery
```

使用：

```js
import $ from "jquery";
```

```vue
<mu-card v-if="toc.length > 0" class="card">
        <div class="toc">
          <div class="title">文章目录</div>
           <!-- 遍历目录 -->
          <div v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </mu-card>
```

mounted函数里面构建自定义目录

```js
mounted() {
  // 到接口请求哪一步，直接将这部分代码移动到接口请求成功之后即可。
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
  },
```

methods添加滚动函数

```js
scrollToPosition(id) {
  var position = $(id).offset();
  position.top = position.top - 80;
  $("html,body").animate({ scrollTop: position.top }, 1000);
},
```



## 5.代码高亮处理

如不需要hightlight代码高亮显示，你应该设置`ishljs`为`false`

为优化插件体积，从**v2.4.2**起以下文件将默认使用`cdnjs`外链:

- `highlight.js`
- `github-markdown-css`
- `katex`(**v2.4.7**)

代码高亮`highlight.js`中的语言解析文件和代码高亮样式将在使用时按需加载. `github-markdown-css`和`katex`仅会在`mounted`时加载

**Notice**: [可选配色方案](https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.css.js) 和 [支持的语言](https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.js) 是从 [highlight.js/9.12.0](https://github.com/isagalaev/highlight.js/tree/master/src) 导出的

[本地按需加载](https://github.com/hinesboy/mavonEditor/blob/master/doc/cn/no-cnd.md)



我们这里要完成`代码高亮` `代码显示行号`  `代码复制`功能

+ 先安装要使用的插件

```bash
$ yarn add clipboard highlight.js
```

+ utils新建markdown.js

```js
const hljs = require("highlight.js");

export const markdown = (mavonEditor, content) => {
  const md = mavonEditor.getMarkdownIt();
  return md
    .set({
      highlight: function(str, lang) {
        const codeIndex =
          parseInt(Date.now()) + Math.floor(Math.random() * 10000000);
        let html = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">copy</button>`;

        const linesLength = str.split(/\n/).length - 1;
        let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
        for (let index = 0; index < linesLength; index++) {
          linesNum = linesNum + "<span></span>";
        }
        linesNum += "</span>";
        if (lang && hljs.getLanguage(lang)) {
          try {
            const preCode = hljs.highlight(lang, str, true).value;
            html = html + preCode;
            if (linesLength) {
              html += '<b class="name">' + lang + "</b>";
            }
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              "&lt;/textarea>"
            )}</textarea>`;
          } catch (error) {
            console.log(error);
          }
        }

        const preCode = md.utils.escapeHtml(str);
        html = html + preCode;
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
          /<\/textarea>/g,
          "&lt;/textarea>"
        )}</textarea>`;
      },
    })
    .render(content);
};

```

+ global.less新增样式

```less
// 代码高亮
pre.hljs {
  padding: 40px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  // 行号样式
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 40px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 4px;
    right: 60px;
    z-index: 10;
    color: #999;
    pointer-events: none;
  }
  // 复制按钮样式
  .copy-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 10;
    color: #333;
    cursor: pointer;
    border: 0;
    border-radius: 2px;
    outline: none;
  }
}
.markdown-body pre.hljs {
  background: #23241f;
}

pre.hljs::after {
  height: 15px;
  width: 100px;
  margin-bottom: -7px;
  border-radius: 5px 5px 0 0;
  display: block;
  content: "";
  background: url(data:image/png;base64,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)
    10px center no-repeat;
  background-size: contain;
  position: absolute;
  top: 10px;
  left: 0;
  box-sizing: border-box;
  z-index: 1;
}
.markdown-body img {
  width: 100%;
}
```



mounted添加复制功能

先导入

```js
import Clipboard from "clipboard";
```



```js
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
```



使用了muse-ui的toast需要安装下载

```bash
$ npm install muse-ui-toast -S
```

Main.js导入和配置

```js
import Toast from "muse-ui-toast";

Vue.use(Toast, {
  position: "top", // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning", // 错误信息图标
});

```



完整代码：

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

        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import RightConfig from "@/components/RightConfig";


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
    Footer,
    Header,
    mavonEditor,
  },
  data() {
    return {
      info: {
        title: "使用jspdf+canvas2html将网页保存为pdf文件",
        introduction: "简介",
        cover: "http://nevergiveupt.top/canvas/html2canvas.png",
      },
      prev: {},
      next: {},
      content: "",
      toc: [],
      commentSuccess: false,
      commentList: [],
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


  },
  methods: {
    scrollToPosition(id) {
      var position = $(id).offset();
      position.top = position.top - 80;
      $("html,body").animate({ scrollTop: position.top }, 1000);
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

