<template>
  <div>
    <mu-dialog
      scrollable
      title="修改资料"
      width="500"
      max-width="90%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
    >
      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="Email（用于登录，不可修改）" prop="email">
          <mu-text-field
            disabled
            v-model.trim="validateForm.email"
            prop="email"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="昵称" prop="nickName" :rules="nickNameRules">
          <mu-text-field
            v-model.trim="validateForm.nickName"
            prop="nickName"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="登录密码" prop="password" :rules="passwordRules">
          <mu-text-field
            v-model.trim="validateForm.password"
            prop="password"
            :action-icon="visibility ? 'visibility_off' : 'visibility'"
            :action-click="() => (visibility = !visibility)"
            :type="visibility ? 'text' : 'password'"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item
          label="确认密码"
          prop="confirmPassword"
          :rules="confirmPasswordRules"
        >
          <mu-text-field
            type="password"
            v-model.trim="validateForm.confirmPassword"
            prop="confirmPassword"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item
          label="个人简介"
          prop="introduction"
          :rules="introductionRules"
        >
          <mu-text-field
            v-model="validateForm.introduction"
            prop="introduction"
            multi-line
            :rows="4"
            full-width
          ></mu-text-field>
        </mu-form-item>
      </mu-form>

      <mu-button slot="actions" flat small @click="clear">取消</mu-button>
      <mu-button slot="actions" flat small color="primary" @click="submit"
        >保存</mu-button
      >
    </mu-dialog>
  </div>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      visibility: false,
      nickNameRules: [
        { validate: (val) => val.length <= 20, message: "昵称最大20个字符！" },
      ],
      passwordRules: [
        {
          validate: (val) => {
            if (val) {
              let reg = /^[a-zA-Z]\w{5,19}$/;
              return reg.test(val);
            } else {
              return true;
            }
          },
          message: "以字母开头，长度在6~20之间，只能包含字母、数字和下划线！",
        },
      ],
      confirmPasswordRules: [
        {
          validate: (val) => {
            if (this.validateForm.password) {
              return !!val;
            } else {
              return true;
            }
          },
          message: "请填写确认密码！",
        },
        {
          validate: (val) => {
            return this.validateForm.password === val;
          },
          message: "密码不一致，请重新输入！",
        },
      ],
      introductionRules: [
        {
          validate: (val) => val.length <= 1000,
          message: "最大1000字符",
        },
      ],
      validateForm: {
        ...this.userInfo,
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(async (result) => {
        console.log(result);
      });
    },
    async logout() {},
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        introduction: "",
      };
      this.$emit("toggle", false);
    },
  },
  watch: {
    userInfo(val) {
      this.validateForm = {
        ...val,
        password: "",
        confirmPassword: "",
      };
    },
  },
};
</script>
<style lang="less" scoped>
</style>