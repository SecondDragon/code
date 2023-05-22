namespace a {
    interface Person {
        xx: string;
        yy: string
    }
    function enhancer(target: any) {
        target.prototype.xx = 'xx';
        target.prototype.yy = 'yy';
    }

    @enhancer
    class Person {
        constructor() { }
    }
    let p = new Person();
    console.log(p.xx);
    console.log(p.yy);

}
//把类整个替换
namespace b {
    function enhancer() {
        return function (target: any) {
            return class extends Person {
                constructor(name: string, age: number) {
                    super(name, age);
                }
                getAge() {
                    console.log(this.age);
                }
            }
        }
    }

    @enhancer()
    class Person {
        public name: string = 'person';
        public age: number = 10;
        constructor(name: string, age: number) { this.name = name, this.age = age }
    }

    let p = new Person('zhufeng', 10);
    p.name;

}

//属性装饰器 装饰属性
namespace c {
    //target如果装饰的是个普通属性的话，那么这个target指向类的原型 Person.prototype
    //target装饰的是一个类的属性static,那么这个target指定类的定义    
    function upperCase(target: any, propertyName: string) {
        let value = target[propertyName];
        const getter = () => value;
        const setter = (newVal: string) => {
            value = newVal.toUpperCase();
        }
        delete target[propertyName];
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    function propertyEnumerable(flag: boolean) {
        return function (target: any, methodName: string) {

        }
    }
    function methodEnumerable(flag: boolean) {
        return function (target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
            propertyDescriptor.enumerable = flag;
        }
    }
    function setAge(age: number) {
        return function (target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
            target.age = age;
        }
    }
    function toNumber(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
        let oldMethod = propertyDescriptor.value;
        propertyDescriptor.value = function (...args: any[]) {
            args = args.map(item => parseFloat(item));
            return oldMethod.apply(this, args);
        }
    }
    class Person {
        static age: number;
        @upperCase
        @propertyEnumerable(false)
        name: string = 'zhufeng'
        @methodEnumerable(true)
        getName() {
            console.log('getName');
        }
        @setAge(100)
        static getAge() {

        }
        @toNumber
        sum(...args: any[]) {
            return args.reduce((accu, item) => accu + item, 0);
        }
    }
    let p = new Person();
    p.name = 'jiagou';
    console.log(p.name);//JIAGOU
    for (let attr in p) {
        console.log('attr=' + attr);
    }
    console.log(Person.age);
    console.log(p.sum(1, '2', '3'));
}

namespace d {
    interface Person {
        age: number
    }
    //Person.prototype login 1
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target, methodName, paramsIndex);
        target.age = 10;
    }
    //参数装饰 方法参数
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password);
        }
    }
    let p = new Person();
    p.login('zhufeng', '123');
}
namespace e {
    function Class1Decorator() {
        return function (target: any) {
            console.log("类1装饰器");
        }
    }
    function Class2Decorator() {
        return function (target: any) {
            console.log("类2装饰器");
        }
    }
    function MethodDecorator() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
            console.log("方法装饰器");
        }
    }
    function Param1Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数1装饰器");
        }
    }
    function Param2Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
            console.log("参数2装饰器");
        }
    }
    function PropertyDecorator(name: string) {
        return function (target: any, propertyName: string) {
            console.log(name + "属性装饰器");
        }
    }

    @Class1Decorator()
    @Class2Decorator()
    class Person {
        @MethodDecorator()
        greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) { }
        @PropertyDecorator('name')
        name: string = 'zhufeng';
        @PropertyDecorator('age')
        age: number = 10;
    }
}
//属性方法先执行，谁先写先执行谁
//方法的时候，先参数再方法，而且 他们一定会在一起
//最后是类
//如果是同类型的，先执行后写的