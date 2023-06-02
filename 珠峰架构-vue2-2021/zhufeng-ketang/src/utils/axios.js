import axios from 'axios'
import store from '../store';
import * as Types from '@/store/action-types.js'
// element =>  支持单例
class HttpRequest {
    constructor() {
        this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:7001';
        this.timeout = 3000;
        // loading 需要加
        this.queue = {}; // 专门用来维护请求队列的  {/:true}
        // 页面切换 我需要取消请求
    }
    setInterceptor(instance, url) {
        instance.interceptors.request.use((config) => {
            // 开启loading  自己找个地方显示
            if (Object.keys(this.queue).length == 0) { // a -> 显示loading  -》 马上关闭了  2-》  显示loading
                // 开loading
            }
            let token = localStorage.getItem('token');
            if(token){
                // 每次请求都会携带一个 权限访问服务器 
                config.headers.authorization = token;
            }

            // 可以记录请求的取消函数   
            let CancelToken = axios.CancelToken;
            // xhr.abort() 终端请求方法 
            config.cancelToken = new CancelToken((c) => { // 存到vuex中 ， 页面切换的时候 组件销毁的是执行
                // c就是当前取消请求的token
                store.commit(Types.SET_TOKEN,c); // 同步将取消方法存入到vuex中
            });
            this.queue[url] = true
            return config; // 只是扩展请求的配置
        })
        instance.interceptors.response.use((res) => {
            delete this.queue[url]; // 一旦响应了 就从队列删除
            if (Object.keys(this.queue).length == 0) {
                // close loading
            }
            if (res.data.err == 0) {
                return res.data.data; // 接口里面配合 可以switchCase 状态
            } else {
                return Promise.reject(res.data); // 失败抛出异常即可
            }
        }, (err) => {
            delete this.queue[url];
            if (Object.keys(this.queue).length == 0) {
                // close loading
            }
            return Promise.reject(err);
        })
    }
    request(options) { // 通过request方法来进行请求操作
        // 每次请求可以创建一个新的实例， 如果业务不复杂你可以不创建实例  直接使用axios
        let instance = axios.create();
        let config = {
            baseURL: this.baseURL,
            timeout: this.timeout,
            ...options
        }
        this.setInterceptor(instance, config.url)
        return instance(config); // 产生的是一个 promise  axios()
    }
    get(url, data = {}) { // url, {}  axios.get('/xxx',{params:xxx})  
        return this.request({
            url,
            method: 'get',
            ...data
        })
    }
    post(url, data = {}) { // axios.post('/xxx',{data})
        return this.request({
            url,
            method: 'post',
            data
        })
    }
}
// ab 用的是同一个实例
// a  axios 里面的请求有独立的拦截器
// b  axios 里面也有拦截器

export default new HttpRequest