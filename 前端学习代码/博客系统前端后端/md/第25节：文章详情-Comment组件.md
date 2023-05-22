# 第25节：文章详情-Comment组件

## 1.新建components/Comment.vue

```bash
<template>
  <div class="clearfix">
    <mu-card-title></mu-card-title>
    <mu-text-field
      class="comment-input"
      placeholder="说点什么..."
      multi-line
      :rows="4"
      full-width
      v-model="content"
    ></mu-text-field>
    <mu-button @click="submit" class="comment-btn" color="primary"
      >评论</mu-button
    >

    <mu-dialog
      title="提示"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="openAlert"
    >
      评论内容需要审核，大约需要24小时。您确定需要继续操作吗？
      <mu-button slot="actions" flat color="primary" @click="ok(false)"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="ok(true)"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
export default {
  props: {
    commentSuccess: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: "",
      openAlert: false,
    };
  },
  methods: {
    submit() {
      if (this.content) {
        this.openAlert = true;
      } else {
        this.$toast.info("请输入评论内容");
      }
    },
    ok(bool) {
      if (bool) {
        this.$emit("comment", {
          content: this.content,
        });
      } else {
        this.openAlert = false;
        this.content = "";
      }
    },
  },
  watch: {
    // 评论成功后关闭弹框
    commentSuccess(val) {
      if (val) {
        this.openAlert = !val;
        this.content = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.comment-input {
  padding: 0 0.42667rem;
}
.comment-btn {
  margin: 0 0.42667rem 0.42667rem 0;
  float: right;
}
</style>
```

## 2.Articles/Details.vue使用

```js
import Comment from "@/components/Comment";
```

局部注册：

```js
export default {
  name: "articlesDetails",
  components: {
  	// ...
    Comment,
  },
  // ...
  data(){
    return {
			// ...
      commentSuccess: false,
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
```

methods定义comment方法

```js
methods: {
    async comment(data) {
      console.log("评论数据", data);
      this.commentSuccess = true;
    },
  },
```

## 4.global.less添加`.clearfix`



```less
.clearfix {
  zoom: 1;
}
.clearfix::after,
.clearfix::before {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
```



## 5.滚动到评论位置

```vue
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
      <mu-button @click="scrollToPosition('#comment')"  fab color="red">
        <mu-icon value="chat"></mu-icon>
      </mu-button>
    </mu-tooltip>
  </div>
</div>
```

scrollToPosition方法我们上节课也定义过了

```js
scrollToPosition(id) {
  var position = $(id).offset();
  position.top = position.top - 80;
  $("html,body").animate({ scrollTop: position.top }, 1000);
},
```

