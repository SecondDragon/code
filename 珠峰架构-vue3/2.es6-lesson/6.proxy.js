// Vue2 中用的是defineProperty 他的特点就是给本来的属性可以用此方法来定义，并且可以把值转化成 get和set  

let obj = {};

// 使用defineProperty 需要定义第三方参数才能 控制set和 get
let _value;
Object.defineProperty(obj, 'a', {
    // 描述符号 
    enumerable: true, // 遍历对象可以被遍历
    configurable: true, // 可以被删除
    //writable:true,
    get() {
        return _value
    },
    set(newValue) {
        _value = newValue
    }
})
obj.a = 100;
console.log(obj.a)

// 把对象的属性 全部转化成 getter +  setter， 遍历所有对象，用Object.defineProperty重新定义属性 性能不好
// 如果是数组 采用这种方式  性能很差 
// 如果对象里面嵌套对象 我需要递归处理

let proxy = new Proxy(obj, { // 没有对obj的属性进行重写，而且不需要递归 + 放访问到的属性是对象时在代理即可
    get() { //proxy.xxx 

    },
    set() { // proxy.xxx = 100

    },
    has() { // 'xxx' in proxy

    },
    deleteProperty(){ // 删除属性的时候后执行此方法

    },
    ownKeys(){ // Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols

    }
}); // proxy 是es6 的api 不用改写原对象 ，但是兼容差
