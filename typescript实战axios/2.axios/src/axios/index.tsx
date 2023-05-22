import Axios from './Axios';
import { AxiosInstance } from './types';
import { CancelToken, isCancel } from './cancel';
//可以创建一个axios的实例 axios其实就是一个函数
//定义一个类的时候,一个类的原型 ，Axios.prototype 一个类的实例
function createInstance(): AxiosInstance {
    let context: Axios<any> = new Axios();//this指针上下文
    //让request 方法里的this永远指向context也就是new Axios()
    let instance = Axios.prototype.request.bind(context);
    //把Axios的类的实例和类的原型上的方法都拷贝到了instance上，也就是request方法上
    instance = Object.assign(instance, Axios.prototype, context);
    return instance as AxiosInstance;
}
let axios = createInstance();
axios.cancelToken = new CancelToken();
axios.isCancel = isCancel;
export default axios;

export * from './types'

