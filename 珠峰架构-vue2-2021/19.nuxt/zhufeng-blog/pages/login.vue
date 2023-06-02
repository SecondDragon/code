<template>
    <div class="login">
        <div class="login-form">
            <div class="login-header">
                <img src="@/assets/logo.png" height="100" />
            </div>
            <div class="login-info">
                <el-input placeholder="请输入用户名" v-model="username"></el-input>

                <el-input placeholder="请输入密码" v-model="password" type="password"></el-input>
            </div>

            <el-button
                type="primary"
                style="width: 100%; margin-bottom: 18px"
                @click.native="login"
            >登录</el-button>
        </div>
    </div>
</template>



<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #e4e5e6;
    .login-header {
        margin-bottom: 20px;
        text-align: center;
    }
    .el-input {
        margin-bottom: 20px;
    }
}
</style>
<script >
export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async login() {
            try {
                let r = await this.$store.dispatch('user/set_login', { username: this.username, password: this.password });
                this.$router.push('/admin')
            } catch (e) {
                console.log(e)
            }

        },
    },
    // middleware() {
    //     console.log('page')
    // },
    // validate() {
    //     console.log('通过校验'); // 参数校验
    //     return true
    // },
    // asyncData({ $axios }) { // 返回的结果会被合并到当前的实例上 是在服务端请求
    //     console.log('获取数据合并到当前页面中')
    //     return {}
    // },
    // fetch(){ // 主要是拉取数据放到vuex中
    // console.log('fetch')
    // },
    // created(){
    //     console.log('front-end')
    // },
    // mounted(){
    //     console.log('client')
    // }
};
</script>