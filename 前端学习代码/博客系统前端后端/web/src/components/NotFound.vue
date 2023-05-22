<template>
  <div class="container">
    <div class="panel">
      <div class="text-center">
        <h2 class="padding-top">
          <span>{{title}}</span>
        </h2>
        <div>
          <div class="float-left">
            <img src="http://www.nevergiveupt.top/ds-1.gif" />
            <div class="alert">{{desc}}</div>
          </div>
          <div class="float-right">
            <img src="http://www.nevergiveupt.top/ds-2.png" width="260" />
          </div>
        </div>
        <div class="padding-big">
          <a href="/articles" class="button bg-yellow">去看文章</a>
          <a href="/" class="button">返回首页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notFound",
  props: {
    title: {
      type: String,
      default: "404错误！抱歉您要找的页面不存在"
    },
    desc: {
      type: String,
      default: "卧槽！页面不见了！"
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  margin-top: 8%;
  .panel {
    margin-top: 20px;
    .text-center {
      text-align: center;
      .padding-top {
        padding-top: 10px;
      }
    }
  }
  .float-left {
    float: left;
    .alert {
      border-radius: 5px;
      padding: 15px;
      border: solid 1px #ddd;
    }
  }
  .float-right {
    float: right;
  }
}
.padding-big {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.button {
  border: solid 1px #ddd;
  background: transparent;
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 15px;
  margin: 0;
  display: inline-block;
  line-height: 20px;
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1) 0s;
}
.bg-yellow {
  background-color: #f60;
  color: #fff;
  margin-right: 20px;
}
</style>