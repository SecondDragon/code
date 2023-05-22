import axios from 'axios';
axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'/':'http://localhost:8899'
axios.defaults.headers.post['Content-Type']="application/json;charset=UTF-8";
axios.interceptors.request.use((config)=>{
    //在每次发送请求之前要把token放到请求头里
    let access_token = sessionStorage.getItem('access_token');
    if(access_token)
        config.headers = {Authorization:`Bearer ${access_token}`};
    return config;    
},(error)=> Promise.reject(error));

axios.interceptors.response.use(
    response=>response.data,//response:{data,headers,config} 提取响应体出来
    (error)=> Promise.reject(error)
);
export default axios;

/* R=  AxiosResponse<T = any>  {
   data: T;
   status: number;
   statusText: string;
   headers: any;
   config: AxiosRequestConfig;
   request?: any;
 } */