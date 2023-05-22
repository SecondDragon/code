namespace a {
    abstract class Animal {
        name: string;
        abstract getName(): string
    }
    class Cat extends Animal {
        getName(): string {
            return this.name;
        }
    }
    let cat = new Cat();
    cat.name = '猫';
    console.log(cat.getName());

    //1. 可以用来描述对象的，指的是对象有哪些属性，属性是什么类型
    interface Point {
        x: number
        y: number
    }
    let point: Point = { x: 0, y: 0 }

    //2.还可以用来描述行为的抽象
    interface Speakable {
        speak(): void //因为接口里所不能放实现，只能放定义，所有的方法都是抽象的
    }
    interface Eatable {
        eat(): void
    }
    //类可以实现多个接口，但只能继承一个父类
    class Person implements Speakable, Eatable {
        speak() { }
        eat() { }
    }
}
namespace b {
    //重写 子类重新实现并覆盖父类中的方法
    class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        speak() {
            console.log('动物叫');
        }
    }
    class Cat extends Animal {
        constructor(name: string) {
            super(name);
        }
        speak() {
            console.log('我们一起喵喵喵');
            super.speak();
        }
    }
    let cat = new Cat();
    cat.speak();
    class Dog extends Animal {
        speak() {
            console.log('我们一起汪汪汪');
            super.speak();
        }
    }
    let dog = new Dog();
    dog.speak();
}


