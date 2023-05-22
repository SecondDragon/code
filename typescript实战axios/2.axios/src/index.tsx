import axios, { AxiosResponse, AxiosRequestConfig } from './axios';
const baseURL = 'http://localhost:8080';
//它指的是服务器返回的对象
interface User {
    name: string;
    password: string
}
let user: User = { name: 'zhufeng', password: '123456' }
const cancelToken = axios.cancelToken;
const isCancel = axios.isCancel;
const source = cancelToken.source();
axios({
    method: 'post',//方法名
    url: baseURL + '/post',//访问路径
    headers: {

    },
    cancelToken: source.token,
    timeout: 1000,
    data: user //查询参数对象，它会转成查询字符串放在?的后面
}).then((response: AxiosResponse<User>) => {
    console.log(response);
    console.log(response.data);// {name:'zhufeng123'}
    // return response.data;//(property) AxiosResponse<User>.data: User
}).catch((error: any) => {
    if (isCancel(error)) {
        console.log('isCancel取消请求', error);
    } else {
        console.log(error);
    }

});
source.cancel('用户取消了请求');