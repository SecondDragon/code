<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-if="isReg"
                v-model="repassword"
                type="password"
                name="repassword"
                label="重复密码"
                placeholder="重复密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;" v-if="isLogin">
                <van-button round block type="info" native-type="submit">登录</van-button>
                <br />
                <van-button round block to="/reg" type="primary">去注册</van-button>
            </div>
             <div style="margin: 16px;"  v-if="isReg">
                <van-button round block native-type="submit" type="info">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script >
export default {
    data() {
        return {
            username: '',
            password: '',
            repassword: ''
        }
    },
    computed: {
        isLogin() {
            return this.$route.path === '/login'
        },
        isReg() {
            return this.$route.path === '/reg'
        }
    },
    methods: {
        onSubmit(values) {
            this.$emit('submit',values);
        }
    }
}
</script>