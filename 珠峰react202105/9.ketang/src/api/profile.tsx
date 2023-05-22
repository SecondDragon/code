import axios from './';
import {RegisterPayload,LoginPayload} from '@/typings/profile'
export function validate(){
   return axios.get('/user/validate');
}
export function register<T>(values:RegisterPayload){
   return axios.post<T,T>('/user/register',values);
}
export function login<T>(values:LoginPayload){
   return axios.post<T,T>('/user/login',values);
}
//post<T = any, R = AxiosResponse<T>>
/* R=  AxiosResponse<T = any>  {
   data: T;
   status: number;
   statusText: string;
   headers: any;
   config: AxiosRequestConfig;
   request?: any;
 } */