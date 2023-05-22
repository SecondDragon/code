/* 类中属性/方法的装饰器 */

/* // 在给实例设置私有属性的时候，触发装饰器函数执行，以此来给属性进行装饰
const test = (target, name, descriptor) => {
    /!* 
    target:Demo.prototype
    name:'x'
    descriptor:{configurable: true, enumerable: true, writable: true, initializer: ƒ}  修饰的属性，则初始值是基于initializer函数设置的！！ 
    *!/
   /!* 
    target:Demo.prototype
    name:'getX'
    descriptor:{configurable: true, enumerable: false, writable: true, value: ƒ}  修饰的函数，则初始值是基于value属性设置的！！ 
    *!/
    console.log(target, name, descriptor);
};
class Demo {
    // @test x = 100;

    @test
    x = 100;

    @test
    getX() { }
}
let d = new Demo;
console.log(d); */



/* 创建只读属性的装饰器 */
const readonly = (_, name, descriptor) => {
    // 把修饰的name属性/方法设置为只读的规则
    descriptor.writable = false;
};

/* 创建记录执行时间日志的修饰器 */
const loggerTime = (_, name, descriptor) => {
    //把之前写的getX函数赋值给func
    let func = descriptor.value;
    // 然后把函数重写了「d.getX()，执行的是重写的这个函数」
    descriptor.value = function proxy(...params) {
        console.time(name);
        let res = func.call(this, ...params);
        console.timeEnd(name);
        return res;
    };
};

/* class Demo {
    @readonly x = 100;

    @readonly
    @loggerTime
    getX() {
        for (let i = 0; i < 100000000; i++) { }
        return this.x;
    }

    @loggerTime
    sum() {
        for (let i = 0; i < 99999999; i++) { }
    }
}
let d = new Demo;
// d.x = 200; //Uncaught TypeError: Cannot assign to read only property 'x' of object '#<Demo>'
console.log(d.getX(10, 20));
d.sum(); */



/* const A = () => {
    console.log(1);
    return () => {
        console.log(2);
    };
};

const B = () => {
    console.log(3);
    return () => {
        console.log(4);
    };
};

class Demo {
    @A()
    @B()
    x = 100;
}
// => 1 3 4 2  也是要把函数先执行，执行的返回值（小函数）作为装饰器函数，从下向上处理！！ */


const test = (target, name, descriptor) => {
    // 返回值必须是一个规则的描述对象，也就是对name修饰属性/方法的规则描述
    return descriptor;
};

class Demo {
    @test
    x = 100;
}

let d = new Demo;
console.log(d);