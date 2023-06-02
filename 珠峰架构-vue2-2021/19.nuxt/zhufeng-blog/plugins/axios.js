export default function({ $axios,app }) {
    $axios.onRequest(config => {
        // 获得token 每次请求都增加上
        let user = app.$cookies.get('user')
        if(user && user.token){
            // 每次请求后端接口 都携带token ， token正常可以拿到数据
            config.headers.authorization = user.token
        }
        return config
    });
    $axios.onResponse(res => {
        console.log(res)
        if (res.data.err === 0) {
            return Promise.resolve(res.data.data)
        } else {

            return Promise.reject(res);
        }
    });
}