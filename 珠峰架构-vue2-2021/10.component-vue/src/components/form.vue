<template>
  <div>
    <!-- el-form  model 中存放着数据  rules 校验规则-->
    <!-- el-form-item 生成label属性的， 当前校验label对应的内容是否合法 -->
    <!-- el-input v-model实现双向绑定 :value input事件 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
        <!-- v-model 放到组件中原理就是解析出value +input属性 -->
        <!-- <el-input :value="ruleForm.password" @input="v=>ruleForm.password=v"></el-input> -->
        <!-- <el-input :value="ruleForm.password" @update:value="v=>ruleForm.password=v"></el-input> -->
        <!-- <el-input :value.sync="ruleForm.password" ></el-input> -->
      </el-form-item>
      <el-form-item>
        <button @click="submitForm">提交表单</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import elForm from "@/components/el-form.vue";
import elInput from "@/components/el-input.vue";
import elFormItem from "@/components/el-form-item.vue";
export default {
  components: {
    "el-form": elForm,
    "el-input": elInput,
    "el-form-item": elFormItem
  },
  data() {
    return {
      ruleForm: {
        username: "xxx",
        password: "qqq"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted(){
    window.my = this.$data;
  }
};
</script>