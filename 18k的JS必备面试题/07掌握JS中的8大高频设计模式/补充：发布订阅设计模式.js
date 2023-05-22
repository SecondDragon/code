/*
 * Publish & Subscribe 发布订阅模式「自定义事件处理的一种方案」
 *   灵感来源于：addEventListener DOM2事件绑定
 *     + 给当前元素的某一个事件行为，绑定多个不同的方法「事件池机制」
 *     + 事件行为触发，会依次通知事件池中的方法执行
 *     + 支持内置事件{标准事件，例如：click、dblclick、mouseenter...}
 *   应用场景：凡是某个阶段到达的时候，需要执行很多方法「更多时候，到底执行多少个方法不确定，需要编写业务边处理的」，我们都可以基于发布订阅设计模式来管理代码；创建事件池->发布计划  向事件池中加入方法->向计划表中订阅任务  fire->通知计划表中的任务执行
 * 
 * 
 * Observer 观察者模式
 * Mediator 中介者模式 
 */

/* 
let $plan1 = $.Callbacks();
// add remove fire
$plan1.add(function () {
    console.log(1, arguments);
});
$plan1.add(function () {
    console.log(2, arguments);
});
setTimeout(() => {
    $plan1.fire(100, 200);
}, 1000);

let $plan2 = $.Callbacks();
$plan2.add(function () {
    console.log(3, arguments);
});
$plan2.add(function () {
    console.log(4, arguments);
});
setTimeout(() => {
    $plan2.fire(300, 400);
}, 2000); 
*/

/* (function () {
    // 自己创造的事件池
    let pond = [];

    // 向事件池中注入方法
    function subscribe(func) {
        // 去重处理
        if (!pond.includes(func)) {
            pond.push(func);
        }

        // 每一次执行，返回的方法是用来移除当前新增的这一项的
        return function unsubscribe() {
            pond = pond.filter(item => item !== func);
        };
    }

    // 通知事件池中的每个方法执行
    subscribe.fire = function fire(...params) {
        pond.forEach(item => {
            if (typeof item === "function") {
                item(...params);
            }
        });
    };

    window.subscribe = subscribe;
})(); */

/* 
// 需求：从服务获取数据，获取数据后要干很多事情
// A
const fn1 = data => {};
subscribe(fn1);

// B
const fn2 = data => {};
subscribe(fn2);

// C
const fn3 = data => {};
subscribe(fn3);

// D
const fn4 = data => {};
subscribe(fn5);

// E
const fn5 = data => {};
subscribe(fn5);

// F
query().then(data => {
    subscribe.fire(data);
}); 
*/

// 一个项目中，我们可能会出现多个事情都需要基于发布订阅来管理，一个事件池不够
//  + 管理多个事件池
//    + 面向对象 类&实例
//    + 每个实例都有一个自己的私有事件池
//    + subscribe/unsubscribe/fire公用的
//  + 一个事件池支持不同的自定义事件类型

/* 
class Sub {
    // 实例私有的属性：私有的事件池
    pond = [];
    // 原型上设置方法：向事件池中订阅任务
    subscribe(func) {
        let self = this,
            pond = self.pond;
        if (!pond.includes(func)) pond.push(func);
        return function unsubscribe() {
            let i = 0,
                len = pond.length,
                item = null;
            for (; i < len; i++) {
                item = pond[i];
                if (item === func) {
                    pond.splice(i, 1);
                    break;
                }
            }
        };
    }
    // 通知当前实例所属事件池中的任务执行
    fire(...params) {
        let self = this,
            pond = self.pond;
        pond.forEach(item => {
            if (typeof item === "function") {
                item(...params);
            }
        });
    }
}
let sub1 = new Sub;
sub1.subscribe(function () {
    console.log(1, arguments);
});
sub1.subscribe(function () {
    console.log(2, arguments);
});
setTimeout(() => {
    sub1.fire(100, 200);
}, 1000);

let sub2 = new Sub;
sub2.subscribe(function () {
    console.log(3, arguments);
});
sub2.subscribe(function () {
    console.log(4, arguments);
});
setTimeout(() => {
    sub2.fire(300, 400);
}, 2000); 
*/


let sub = (function () {
    let pond = {};

    // 向事件池中追加指定自定义事件类型的方法
    const on = function on(type, func) {
        // 每一次增加的时候，验证当前类型在事件池中是否已经存在
        !Array.isArray(pond[type]) ? pond[type] = [] : null;
        let arr = pond[type];
        if (arr.includes(func)) return;
        arr.push(func);
    };

    // 从事件池中移除指定自定义事件类型的方法
    const off = function off(type, func) {
        let arr = pond[type],
            i = 0,
            item = null;
        if (!Array.isArray(arr)) throw new TypeError(`${type} 自定义事件在事件池中并不存在!`);
        for (; i < arr.length; i++) {
            item = arr[i];
            if (item === func) {
                // 移除掉
                // arr.splice(i, 1); //这样导致数据塌陷
                arr[i] = null; //这样只是让集合中当前项值变为null，但是集合的机构是不发生改变的「索引不变」；下一次执行emit的时候，遇到当前项是null，我们再去把其移除掉即可；
                break;
            }
        }
    };

    // 通知事件池中指定自定义事件类型的方法执行
    const emit = function emit(type, ...params) {
        let arr = pond[type],
            i = 0,
            item = null;
        if (!Array.isArray(arr)) throw new TypeError(`${type} 自定义事件在事件池中并不存在!`);
        for (; i < arr.length; i++) {
            item = arr[i];
            if (typeof item === "function") {
                item(...params);
                continue;
            }
            //不是函数的值都移除掉即可
            arr.splice(i, 1);
            i--;
        }
    };

    return {
        on,
        off,
        emit
    };
})();


const fn1 = () => console.log(1);
const fn2 = () => console.log(2);
const fn3 = () => {
    console.log(3);
    sub.off('A', fn1);
    sub.off('A', fn2);
};
const fn4 = () => console.log(4);
const fn5 = () => console.log(5);
const fn6 = () => console.log(6);

sub.on('A', fn1);
sub.on('A', fn2);
sub.on('A', fn3);
sub.on('A', fn4);
sub.on('A', fn5);
sub.on('A', fn6);
setTimeout(() => {
    sub.emit('A');
}, 1000);

setTimeout(() => {
    sub.emit('A');
}, 2000);

/* sub.on('B', fn4);
sub.on('B', fn5);
sub.on('B', fn6);
setTimeout(() => {
    sub.emit('B');
}, 2000); */