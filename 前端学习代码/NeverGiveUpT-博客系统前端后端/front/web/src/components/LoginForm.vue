<template>
  <div>
    <mu-dialog
      title="登录"
      width="500"
      max-width="90%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="open"
      dialog-class="dialog-style"
    >
      <mu-button class="close" icon @click="clear">
        <mu-icon value="close"></mu-icon>
      </mu-button>

      <mu-form ref="form" :model="validateForm">
        <mu-form-item label="Email" prop="email" :rules="emailRules">
          <mu-text-field
            v-model.trim="validateForm.email"
            prop="email"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field
            v-model.trim="validateForm.password"
            type="password"
            prop="password"
          ></mu-text-field>
        </mu-form-item>

        <mu-form-item label="验证码" prop="captcha" :rules="captchaRules">
          <mu-text-field
            placeholder="区分大小写"
            v-model.trim="validateForm.captcha"
            prop="captcha"
          >
            <div @click="getCaptcha" class="captcha" v-html="captcha"></div>
          </mu-text-field>
        </mu-form-item>
        <div class="forgot-pwd">
          <mu-button flat color="secondary">忘记密码？</mu-button>
        </div>
        <div>
          <mu-button full-width round color="primary" @click="submit"
            >登录</mu-button
          >

          <div class="other-login">
            <h4>第三方登录</h4>
            <mu-button icon href="/api/v1/web/github/login">
              <mu-avatar size="26">
                <img :src="Icon.github" alt />
              </mu-avatar>
            </mu-button>
          </div>
        </div>
      </mu-form>
    </mu-dialog>
  </div>
</template>
<script>
import { Icon } from "@/utils";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    close() {
      this.open = false;
    },
    ok() {
      this.close();
    },
  },
  data() {
    return {
      captcha: "",
      emailRules: [{ validate: (val) => !!val, message: "邮箱必填！" }],
      passwordRules: [{ validate: (val) => !!val, message: "密码必填！" }],
      captchaRules: [{ validate: (val) => !!val, message: "请输入验证码" }],
      validateForm: {
        email: "",
        password: "",
        captcha: "",
      },
      Icon,
    };
  },
  methods: {
    async getCaptcha() {
      const res = await this.$axios.get("/captcha");
      if (res) {
        this.captcha = res.data;
      }
    },
    submit() {
      this.$refs.form.validate().then(async (result) => {
        if (result) {
          const res = await this.$axios.post("/login", this.validateForm);
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$toast.success("登录成功");
            location.reload();
            this.$emit("toggle", false);
          } else {
            this.$toast.error(res.msg);
            this.getCaptcha();
          }
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        email: "",
        password: "",
        captcha: "",
      };
      this.$emit("toggle", false);
    },
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.getCaptcha();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.captcha {
  cursor: pointer;
  /deep/ svg {
    vertical-align: middle;
  }
}
.forgot-pwd {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.other-login {
  text-align: center;
  color: #333;
}
.close {
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 999;
}

</style>