
interface OnFulfilled<V> {
    (value: V): V | PromiseLike<V> | undefined | null
}//V | PromiseLike<V>) | undefined | null
interface OnRejected {
    (error: any): any
}
export interface Interceptor<V> {//某一个拦截器
    onFulfilled?: OnFulfilled<V>;  //成功的回调
    onRejected?: OnRejected;  //失败的回调
}

//T 可能AxiosRequestConfig,也可能是AxiosResponse
export default class InterceptorManager<V> {
    public interceptors: Array<Interceptor<V> | null> = []
    use(onFulfilled?: OnFulfilled<V>, onRejected?: OnRejected): number {
        this.interceptors.push({
            onFulfilled,
            onRejected
        });
        return this.interceptors.length - 1;
    }
    eject(id: number) {
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }
}