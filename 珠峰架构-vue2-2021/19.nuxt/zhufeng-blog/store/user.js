export const state = () => {
    return {
        username: null,
        token: null, // 每次发送ajax的时候 要验证token的正确性
    }
}
export const mutations = {
    set_user(state, payload) {
        state.username = payload.username;
        state.token = payload.token;
    }
}

export const actions = {
    async set_login({ commit }, payload) { // 3000  -> 7001 从而解决了跨域 ，和以前webpack一样的
        let userInfo = await this.$axios.post('/api/login', payload)
        commit('set_user', userInfo); // 不会持久化 刷新丢失
        // cookie
        // 服务端和客户端都可以使用
        this.app.$cookies.set('user',userInfo); // 存到浏览器中
    }
}