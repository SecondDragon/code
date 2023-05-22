/* 
类的装饰器 
    @函数
    class Xxx{}
创建类的时候，会把装饰器函数执行
  + target：当前装饰的这个类
我们可以在装饰器函数中，给类设置一些静态私有的属性方法、或者设置原型上的属性方法等
----
同一个装饰器可以作用在多个类上「需要基于class创建类」
同一个类上，也可以使用多个装饰器
*/
/* const test = (target) => {
    target.num = 100;
    target.getNum = function getNum() { };
    target.prototype.say = function say() { };
};

@test
class Demo { }

@test
class Child { }

console.dir(Demo);
console.dir(Child); */

/* const test = (target) => {
    // target:Demo
    target.num = 100;
    // 装饰器函数执行的返回结果，会替换原有的类
    // return 100; //=>Demo就是100了
};
@test
class Demo { } */

/* 
// 编译后的结果
var _class;
const test = target => {
    target.num = 100;
};
let Demo = test(_class = class Demo { }) || _class; 
*/


/* 同一个类可以使用多个装饰器，处理顺序：从下到上处理 */
/* 
const sum = target => {
    console.log('sum装饰器函数');
    target.prototype.sum = function sum() { };
};
const staticNum = target => {
    console.log('staticNum装饰器函数');
    target.num = 10;
    target.setNum = function setNum(val) {
        this.num = val;
    };
};

@sum
@staticNum
class Demo { }
console.dir(Demo); 
*/

/* 
// 编译后的代码
var _class;
const sum = target => {
    // ...
};
const staticNum = target => {
    // ...
};
let Demo = sum(_class = staticNum(_class = class Demo { }) || _class) || _class;
console.dir(Demo); 
*/


/* 可以基于传递不同的值，让装饰器函数有不同的效果 */
const test = (x, y) => {
    console.log(1);
    // x:10 y:20
    // 返回的函数是装饰器函数
    return (target) => {
        console.log(2);
        target.num = x + y;
    };
};
const handle = () => {
    console.log(3);
    return (target) => {
        console.log(4);
        target.handle = 'AAA';
    };
};

@test(10, 20)
@handle()
class Demo { }
//=> 1 3 4 2 需要先把外层函数执行，获取装饰器函数后，再按照从下到上的顺序，来执行装饰器函数

/* @test
class Demo { }
// 把test执行，把Demo传递给x「y=undefined」，返回的函数会替换Demo */