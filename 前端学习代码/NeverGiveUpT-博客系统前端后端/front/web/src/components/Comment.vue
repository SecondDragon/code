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
      评论内容将在30分钟内进行审核。您确定需要继续操作吗？
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
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) {
        this.$toast.info("请登录后在评论");
        return;
      }
      if (this.content) {
        this.openAlert = true;
      } else {
        this.$toast.info("请输入评论内容");
      }
    },
    ok(bool) {
      if (bool) {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        this.$emit("comment", {
          content: this.content,
          ...user,
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