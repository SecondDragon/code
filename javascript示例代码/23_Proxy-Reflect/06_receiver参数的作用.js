const obj = {
  _name: "why",
  age:18,
  get name() {
    console.log("目前的this 指向",this);
    return this._name
  },
  set name(newValue) {
    console.log("目前的this 指向", this);
    this._name = newValue
  }
}

// const objProxy = new Proxy(obj, {
//   get: function(target, key, receiver) {
//     // receiver是创建出来的代理对象
//     console.log("get方法被访问--------", key, receiver)
//     console.log(receiver === objProxy)
//     return Reflect.get(target, key, receiver)
//   },
//   set: function(target, key, newValue, receiver) {
//     console.log("set方法被访问--------", key)
//     Reflect.set(target, key, newValue, receiver)
//   }
// })

// // console.log(objProxy.name)
// objProxy.name = "kobe"


// 这里其实就是 在 原对象 设置了get 和 set方法， 使得不使用 原 _name 时 使用 原对象 obj.name 也能通过 this._name 取得 obj的值 
// 如果 在Proxy直接 使用 Reflect.get(target, key) 就相当于 在使用 objProxy.name这条语句的时候 ，未通过 代理对象，直接 拿到了 obj.name的值，也就是_name的值 ，那么 
// 我们就没有 通过 代理对象取值  
// 在加入receiver 后，会改变get name() 里面的this指向 ，objProxy.name会使得代理对象里的get 被执行两次， 
// 第一次 查找的是 key name 找到了 obj的 get name() 函数 
// receiver会改变函数的this为objProxy
// 就相当于 调用了objProxy._name 这时，就会再次调用Proxy对象objProxy的get方法，这次查找的key就是_name了，
// 这样就可以把obj的obj.name的操作也给成功的代理掉了




// 如果不使用receiver
// 当我们通过代理对象 objProxy读取name属性的时候，会进入到 get 捕获器里面，然后又通过 Reflect.get() ，会去访问 obj 对象的 get方法，在里面又通过obj 对象的 this 访问obj 的_name属性。
// 如果我们对obj内所有属性的访问和操作都想经过 proxy代理拦截的话，那么就有问题了，目前对于obj的 _name 的访问后续没有通过objProxy代理，而是通过了obj内部的this._name,
// 那么拦截就失去了效果，因此要想办法让 obj中 get访问的属性 this指向为代理对象。

// set同理

// 未加receiver
// const objProxy = new Proxy(obj, {
//   get: function (target, key) { 
//     console.log("get方法被访问--------", key);
//     return Reflect.get(target, key);
//   },set: function(target, key, newValue) {
//     console.log("set方法被访问--------", key)
//     Reflect.set(target, key, newValue)
//   }
// })


const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    console.log("get方法被访问--------", key);
    return Reflect.get(target, key, receiver);
    // return Reflect.get(target, key);

  },
  set: function (target, key, newValue, receiver) {
    console.log("set方法被访问--------", key);
    Reflect.set(target, key, newValue, receiver);
  },
});
console.log("objProxy------",objProxy);
console.log(objProxy.name);
console.log(objProxy.age);
objProxy.name = "kobe";
objProxy.age = 14;