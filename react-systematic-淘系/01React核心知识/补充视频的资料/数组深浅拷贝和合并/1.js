let obj = {
    name: '珠峰',
    age: 13,
    bool: true,
    n: null,
    u: undefined,
    sym: Symbol('sym'),
    big: 10n,
    list: [10, 20, 30],
    reg: /\d+/,
    time: new Date,
    err: new Error('xxx'),
    num: new Number(1),
    ke: {
        js: '基础课',
        web: '高级课'
    },
    [Symbol('KEY')]: 100,
    fn: function () { },
    xxx: Object(Symbol())
};
obj.obj = obj;


/*
 数组对象深拷贝的第一种办法：JSON.stringify/parse
   + 不能处理BigInt类型的属性值  Uncaught TypeError: Do not know how to serialize a BigInt
   + 如果对象出现“套娃操作”，则也会报错  Uncaught TypeError: Converting circular structure to JSON
   + 如果属性值是 undefined/symobol/function 类型的，会丢失掉「执行stringify的时候就丢了」
   + 如果属性名是 symbol 类型的，也会丢失
   + 如果属性值是 正则对象/错误对象... 类型的，直接变为{}
   + 如果属性值是 非标准特殊对象(new Number(1)) ，会变为其原始值类型的值
   + 如果属性值是 日期对象，变为日期字符串后，就无法再变回来了
   + ...

 JSON.parse(JSON.stringify(obj))
   + 第一步把obj对象变为JSON字符串
   + 第二步再把JSON字符串变为一个新对象「所有级别的内存都会重新开辟，实现深拷贝的效果」

 只适用于，属性名/属性值是：数字、字符串、布尔、null、数组、纯粹对象 这些情况！！
 */


/*
 数组或者对象的浅拷贝：
   let obj2 = { ...obj };
   let obj2 = Object.assign({},obj);
   let arr2 = [...arr];
   let arr2 = arr.slice(0);
   ...
 */

//=======================
/* let obj1 = {
    name: '张三',
    age: 25,
    hobby: {
        music: 100,
        jump: 80
    }
};
obj1.obj1 = obj1;
let obj2 = {
    name: '李四',
    age: 22,
    sex: 0,
    hobby: {
        read: 100,
        music: 90
    }
};
let obj3 = {
    name: '王五',
    age: 20,
    height: '158cm',
    score: {
        math: 100,
        chinese: 90
    }
};
// console.log(_.merge({}, obj1, obj2, obj3));
console.log(_.merge(true, {}, obj1, obj2, obj3)); */


/*
  Object.assign(obj1, obj2) 浅合并多个对象
    + 用obj2中的每一项替换obj1中的每一项「1和2都有的，以2为主；1有2没有的，保留1的；1没有2有的，给1也加上；」
    + obj1的内容会被修改，obj2不会改
    + 最后返回的是obj1
    + 浅合并：只对对象第一级内容进行合并替换

  Object.assign(obj1, obj2, obj3)
    + 先拿obj2替换obj1
    + 再拿obj3替换obj1
    + ...

  let obj = Object.assign({}, obj1, obj2, obj3)
    + 这样obj1不会被更改
    + 返回的是新对象

  -------浅合并的方式有很多
  let obj = {
      ...obj1,
      ...obj2,
      ...obj3
  };
 */
// let obj = Object.assign(obj1, obj2);
// console.log(obj, obj === obj1, obj2);

// Object.assign(obj1, obj2, obj3);
// console.log(obj1);