import { observable, autorun, observe, reaction, computed, action, configure, runInAction } from 'mobx';

const query = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1000);
        }, 1000);
    });
};

class Store {
    @observable x = 10;
    @action.bound async change() {
        let res = 0;
        try {
            res = await query();
        } catch (_) { }
        // 需要在异步结束后，基于runInAction去修改状态
        runInAction(() => {
            this.x = res;
        });
    }
}
let store = new Store;
autorun(() => {
    console.log('autorun:', store.x);
});
store.change(); //返回promise实例，当异步操作结束后，实例会变为成功的{这样我们可以在外部了解到啥时候处理完}


//========================
/* // mobx的全局配置
configure({
    // 强制使用action方法的模式，去修改状态；不允许单独基于实例修改状态了！！
    enforceActions: 'observed'
});
class Store {
    @observable x = 10;
    @observable y = 20;
    // action：修饰函数的装饰器，它让函数中的状态更改变为“异步批处理”「真实项目中，状态值的更改，我们建议都使用这种方式！」
    // action.bound：保证函数无论如何执行，函数中的this都是Store的实例
    @action.bound change() {
        this.x = 1000;
        this.y = 2000;
    }
}
let store = new Store;

autorun(() => {
    console.log('autorun:', store.x, store.y);
});
setTimeout(() => {
    /!* // 修改多个状态，会让autorun监听器执行多次！！
    store.x = 1000;
    store.y = 2000; *!/

    // store.change(); //this->store
    /!* let func = store.change;
    func(); //没有设置bound this->undefined ；设置bound后 this->store *!/

    // 基于runInAction可以实现出和@action一模一样的效果！！
    runInAction(() => {
        store.x = 1000;
        store.y = 2000;
    });
}, 1000); */

//========================
/* class Store {
    @observable x = 10;
    @observable count = 3;
    @observable price = 120;
    // computed：装饰器，创建一个具备计算缓存的计算属性
    @computed get total() {
        console.log('total run');
        return this.count * this.price;
    }
}
let store = new Store;

// reaction：和autorun一样，都是监听器，提供更细粒化的状态监测「默认是不会执行的」
reaction(
    () => [store.x, store.total],
    () => {
        console.log('reaction:', store.x, store.total);
    }
);
/!* autorun(() => {
    console.log('autorun:', store.x, store.total);
}); *!/
setTimeout(() => {
    store.x = 1000; //total计算属性不会重新执行，用之前缓存的结果
    // store.count = 10; //total计算属性需要重新执行，计算出新的值
}, 1000); */


//========================
/* // 经过observable处理后的数据，是基于ES6Proxy做过数据劫持的，这样我们后期修改状态值，就可以在SETTER函数中去做一些特殊处理，例如：把依赖其值的监听器触发执行...
let obj = observable({
    x: 10,
    y: 20
});
// 创建监听器，对对象进行监听，当对象中的某个成员发生改变，触发回调函数执行「前提是：对象是基于observable修饰的，把其变为可监听的了」
observe(obj, change => {
    console.log(change); //=>{type:'update',name:'x',oldValue:10,newValue:1000,...}
});
obj.x = 1000; */

/* // observable无法直接装饰原始值，需要使用observable.box处理
let x = observable.box(10);
console.log(x); //=>ObservableValue
console.log(x.get()); //10
observe(x, change => {
    console.log(change);
});
x.set(1000); */


/* class Store {
    // observable：把状态变为可监测的，只有这样，以后基于autorun/@observer等监测机制才会生效！！
    @observable x = 10;
}
let store = new Store;

autorun(() => {
    // 首先会立即执行一次，自动建立起依赖监测「监测用到的状态」；当依赖的状态值发生改变，callback会重新执行！
    console.log('autorun:', store.x);
});
setTimeout(() => {
    store.x = 1000;
}, 1000); */


/* // ES6中的内置API：Proxy「这就是mobx>=5不支持IE的原因」
// 对当前某个对象进行数据劫持和代理：这样就可以在操作对象成员的时候，触发get/set等劫持函数，做一些自己要做的特殊处理！！
let obj = {
    x: 10,
    y: 20
};
let proxyObj = new Proxy(obj, {
    get(target, key) {
        console.log('GETTER');
        return target[key];
    },
    set(target, key, val) {
        console.log('SETTER');
        target[key] = val;
        return key;
    }
});
console.log(proxyObj); //返回的代理对象是被劫持的
console.log(proxyObj.x); //获取某个成员值的时候，就会触发get函数
proxyObj.x = 1000; //设置某个成员值的时候，就会触发set函数 */