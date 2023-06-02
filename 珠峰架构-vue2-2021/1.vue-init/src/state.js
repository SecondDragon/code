import { observe } from "./observer/index"; // node_resolve_plugin
import { isFunction } from "./utils";

export function initState(vm) { // 状态的初始化
    const opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    // if(opts.computed){
    //     initComputed();
    // }
    // if(opts.watch){
    //     initWatch();
    // }
}

function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key];
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}
function initData(vm) { //
    let data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty

    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联


    data = vm._data = isFunction(data) ? data.call(vm) : data;

    // 用户去vm.xxx => vm._data.xxx
    for(let key in data){ // vm.name = 'xxx'  vm._data.name = 'xxx'
        proxy(vm,'_data',key); 
    }

    observe(data);
}